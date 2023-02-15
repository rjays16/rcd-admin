import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\abstract.js'), 'abstract.js')
  resolveStoreModules(require('..\\store\\attendance.js'), 'attendance.js')
  resolveStoreModules(require('..\\store\\auth.js'), 'auth.js')
  resolveStoreModules(require('..\\store\\booth-designs.js'), 'booth-designs.js')
  resolveStoreModules(require('..\\store\\delegates.js'), 'delegates.js')
  resolveStoreModules(require('..\\store\\fees.js'), 'fees.js')
  resolveStoreModules(require('..\\store\\industry-lectures.js'), 'industry-lectures.js')
  resolveStoreModules(require('..\\store\\members.js'), 'members.js')
  resolveStoreModules(require('..\\store\\options.js'), 'options.js')
  resolveStoreModules(require('..\\store\\orders.js'), 'orders.js')
  resolveStoreModules(require('..\\store\\payments.js'), 'payments.js')
  resolveStoreModules(require('..\\store\\plenaries.js'), 'plenaries.js')
  resolveStoreModules(require('..\\store\\sponsors.js'), 'sponsors.js')
  resolveStoreModules(require('..\\store\\symposia.js'), 'symposia.js')
  resolveStoreModules(require('..\\store\\users.js'), 'users.js')
  resolveStoreModules(require('..\\store\\vips.js'), 'vips.js')
  resolveStoreModules(require('..\\store\\settings\\abstract-submission.js'), 'settings/abstract-submission.js')
  resolveStoreModules(require('..\\store\\settings\\ideapay.js'), 'settings/ideapay.js')
  resolveStoreModules(require('..\\store\\settings\\page-iframes.js'), 'settings/page-iframes.js')
  resolveStoreModules(require('..\\store\\settings\\privacy-policy.js'), 'settings/privacy-policy.js')
  resolveStoreModules(require('..\\store\\settings\\registration.js'), 'settings/registration.js')
  resolveStoreModules(require('..\\store\\settings\\terms-and-conditions.js'), 'settings/terms-and-conditions.js')
  resolveStoreModules(require('..\\store\\settings\\vcc.js'), 'settings/vcc.js')
  resolveStoreModules(require('..\\store\\settings\\workshop.js'), 'settings/workshop.js')
  resolveStoreModules(require('..\\store\\sponsor_assets\\brochures.js'), 'sponsor_assets/brochures.js')
  resolveStoreModules(require('..\\store\\sponsor_assets\\product-catalogue.js'), 'sponsor_assets/product-catalogue.js')
  resolveStoreModules(require('..\\store\\sponsor_assets\\videos.js'), 'sponsor_assets/videos.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\abstract.js',
      '..\\store\\attendance.js',
      '..\\store\\auth.js',
      '..\\store\\booth-designs.js',
      '..\\store\\delegates.js',
      '..\\store\\fees.js',
      '..\\store\\index.js',
      '..\\store\\industry-lectures.js',
      '..\\store\\members.js',
      '..\\store\\options.js',
      '..\\store\\orders.js',
      '..\\store\\payments.js',
      '..\\store\\plenaries.js',
      '..\\store\\sponsors.js',
      '..\\store\\symposia.js',
      '..\\store\\users.js',
      '..\\store\\vips.js',
      '..\\store\\settings\\abstract-submission.js',
      '..\\store\\settings\\ideapay.js',
      '..\\store\\settings\\page-iframes.js',
      '..\\store\\settings\\privacy-policy.js',
      '..\\store\\settings\\registration.js',
      '..\\store\\settings\\terms-and-conditions.js',
      '..\\store\\settings\\vcc.js',
      '..\\store\\settings\\workshop.js',
      '..\\store\\sponsor_assets\\brochures.js',
      '..\\store\\sponsor_assets\\product-catalogue.js',
      '..\\store\\sponsor_assets\\videos.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
