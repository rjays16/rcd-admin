import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e97bb41a = () => interopDefault(import('..\\pages\\attendees\\index.vue' /* webpackChunkName: "pages/attendees/index" */))
const _470d546c = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _140c5e3e = () => interopDefault(import('..\\pages\\delegates\\index.vue' /* webpackChunkName: "pages/delegates/index" */))
const _2c72938a = () => interopDefault(import('..\\pages\\fees\\index.vue' /* webpackChunkName: "pages/fees/index" */))
const _768df448 = () => interopDefault(import('..\\pages\\industry-lectures\\index.vue' /* webpackChunkName: "pages/industry-lectures/index" */))
const _ca91a5c2 = () => interopDefault(import('..\\pages\\orders.vue' /* webpackChunkName: "pages/orders" */))
const _4190ddbb = () => interopDefault(import('..\\pages\\payments\\index.vue' /* webpackChunkName: "pages/payments/index" */))
const _f8cfdaee = () => interopDefault(import('..\\pages\\plenary\\index.vue' /* webpackChunkName: "pages/plenary/index" */))
const _4e39fe62 = () => interopDefault(import('..\\pages\\sponsors\\index.vue' /* webpackChunkName: "pages/sponsors/index" */))
const _16c495e3 = () => interopDefault(import('..\\pages\\symposia\\index.vue' /* webpackChunkName: "pages/symposia/index" */))
const _4e95c852 = () => interopDefault(import('..\\pages\\vips\\index.vue' /* webpackChunkName: "pages/vips/index" */))
const _6e648bc6 = () => interopDefault(import('..\\pages\\abstract\\EPoster.vue' /* webpackChunkName: "pages/abstract/EPoster" */))
const _7fbff56f = () => interopDefault(import('..\\pages\\abstract\\FreePapers.vue' /* webpackChunkName: "pages/abstract/FreePapers" */))
const _2891726c = () => interopDefault(import('..\\pages\\fees\\add.vue' /* webpackChunkName: "pages/fees/add" */))
const _f9a142d0 = () => interopDefault(import('..\\pages\\plenary\\add.vue' /* webpackChunkName: "pages/plenary/add" */))
const _055ef4c8 = () => interopDefault(import('..\\pages\\site-settings\\abstract-submission.vue' /* webpackChunkName: "pages/site-settings/abstract-submission" */))
const _a4dad16a = () => interopDefault(import('..\\pages\\site-settings\\banner.vue' /* webpackChunkName: "pages/site-settings/banner" */))
const _52d07aee = () => interopDefault(import('..\\pages\\site-settings\\event-schedule.vue' /* webpackChunkName: "pages/site-settings/event-schedule" */))
const _4a572bec = () => interopDefault(import('..\\pages\\site-settings\\nav-settings.vue' /* webpackChunkName: "pages/site-settings/nav-settings" */))
const _4a1380d3 = () => interopDefault(import('..\\pages\\site-settings\\page-access.vue' /* webpackChunkName: "pages/site-settings/page-access" */))
const _3b3eb570 = () => interopDefault(import('..\\pages\\site-settings\\page-iframes.vue' /* webpackChunkName: "pages/site-settings/page-iframes" */))
const _5f33d294 = () => interopDefault(import('..\\pages\\site-settings\\privacy-policy.vue' /* webpackChunkName: "pages/site-settings/privacy-policy" */))
const _2e107118 = () => interopDefault(import('..\\pages\\site-settings\\registration.vue' /* webpackChunkName: "pages/site-settings/registration" */))
const _5a172d53 = () => interopDefault(import('..\\pages\\site-settings\\terms-and-conditions.vue' /* webpackChunkName: "pages/site-settings/terms-and-conditions" */))
const _e405ee72 = () => interopDefault(import('..\\pages\\site-settings\\vcc.vue' /* webpackChunkName: "pages/site-settings/vcc" */))
const _d84efc8a = () => interopDefault(import('..\\pages\\site-settings\\vods\\index.vue' /* webpackChunkName: "pages/site-settings/vods/index" */))
const _7cb52d8d = () => interopDefault(import('..\\pages\\site-settings\\welcome-message.vue' /* webpackChunkName: "pages/site-settings/welcome-message" */))
const _6e65b344 = () => interopDefault(import('..\\pages\\sponsors\\add.vue' /* webpackChunkName: "pages/sponsors/add" */))
const _2e94e3c7 = () => interopDefault(import('..\\pages\\sponsors\\booth-designs\\index.vue' /* webpackChunkName: "pages/sponsors/booth-designs/index" */))
const _7b0e1f1c = () => interopDefault(import('..\\pages\\symposia\\add.vue' /* webpackChunkName: "pages/symposia/add" */))
const _1bb21d47 = () => interopDefault(import('..\\pages\\symposia\\categories\\index.vue' /* webpackChunkName: "pages/symposia/categories/index" */))
const _1ec5f24a = () => interopDefault(import('..\\pages\\site-settings\\vods\\add.vue' /* webpackChunkName: "pages/site-settings/vods/add" */))
const _350b6756 = () => interopDefault(import('..\\pages\\sponsors\\booth-designs\\add.vue' /* webpackChunkName: "pages/sponsors/booth-designs/add" */))
const _332900d6 = () => interopDefault(import('..\\pages\\symposia\\categories\\add.vue' /* webpackChunkName: "pages/symposia/categories/add" */))
const _48c6704e = () => interopDefault(import('..\\pages\\site-settings\\vods\\edit\\_id.vue' /* webpackChunkName: "pages/site-settings/vods/edit/_id" */))
const _1e0143e5 = () => interopDefault(import('..\\pages\\sponsors\\booth-designs\\edit\\_id.vue' /* webpackChunkName: "pages/sponsors/booth-designs/edit/_id" */))
const _5ee5bd65 = () => interopDefault(import('..\\pages\\symposia\\categories\\edit\\_id.vue' /* webpackChunkName: "pages/symposia/categories/edit/_id" */))
const _2db8aadc = () => interopDefault(import('..\\pages\\delegates\\edit\\_id.vue' /* webpackChunkName: "pages/delegates/edit/_id" */))
const _6e5cbc59 = () => interopDefault(import('..\\pages\\fees\\edit\\_id.vue' /* webpackChunkName: "pages/fees/edit/_id" */))
const _abe7a834 = () => interopDefault(import('..\\pages\\industry-lectures\\edit\\_id.vue' /* webpackChunkName: "pages/industry-lectures/edit/_id" */))
const _67d038fb = () => interopDefault(import('..\\pages\\plenary\\edit\\_id\\index.vue' /* webpackChunkName: "pages/plenary/edit/_id/index" */))
const _0297c2f5 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\index.vue' /* webpackChunkName: "pages/sponsors/edit/_id/index" */))
const _24928801 = () => interopDefault(import('..\\pages\\symposia\\edit\\_id.vue' /* webpackChunkName: "pages/symposia/edit/_id" */))
const _5ad22a20 = () => interopDefault(import('..\\pages\\vips\\edit\\_id.vue' /* webpackChunkName: "pages/vips/edit/_id" */))
const _3a8bf560 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\brochures\\index.vue' /* webpackChunkName: "pages/sponsors/edit/_id/brochures/index" */))
const _45b66a94 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\product-catalogue\\index.vue' /* webpackChunkName: "pages/sponsors/edit/_id/product-catalogue/index" */))
const _16af2bc6 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\videos\\index.vue' /* webpackChunkName: "pages/sponsors/edit/_id/videos/index" */))
const _cc2551c2 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\brochures\\add.vue' /* webpackChunkName: "pages/sponsors/edit/_id/brochures/add" */))
const _308a3d63 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\product-catalogue\\add.vue' /* webpackChunkName: "pages/sponsors/edit/_id/product-catalogue/add" */))
const _0c4ee9a8 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\videos\\add.vue' /* webpackChunkName: "pages/sponsors/edit/_id/videos/add" */))
const _2bcb0a53 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\brochures\\edit\\_brochure_id.vue' /* webpackChunkName: "pages/sponsors/edit/_id/brochures/edit/_brochure_id" */))
const _40342c18 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\product-catalogue\\edit\\_catalog_id.vue' /* webpackChunkName: "pages/sponsors/edit/_id/product-catalogue/edit/_catalog_id" */))
const _8e147d02 = () => interopDefault(import('..\\pages\\sponsors\\edit\\_id\\videos\\edit\\_video_id.vue' /* webpackChunkName: "pages/sponsors/edit/_id/videos/edit/_video_id" */))
const _7a6b77f0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/attendees",
    component: _e97bb41a,
    name: "attendees"
  }, {
    path: "/dashboard",
    component: _470d546c,
    name: "dashboard"
  }, {
    path: "/delegates",
    component: _140c5e3e,
    name: "delegates"
  }, {
    path: "/fees",
    component: _2c72938a,
    name: "fees"
  }, {
    path: "/industry-lectures",
    component: _768df448,
    name: "industry-lectures"
  }, {
    path: "/orders",
    component: _ca91a5c2,
    name: "orders"
  }, {
    path: "/payments",
    component: _4190ddbb,
    name: "payments"
  }, {
    path: "/plenary",
    component: _f8cfdaee,
    name: "plenary"
  }, {
    path: "/sponsors",
    component: _4e39fe62,
    name: "sponsors"
  }, {
    path: "/symposia",
    component: _16c495e3,
    name: "symposia"
  }, {
    path: "/vips",
    component: _4e95c852,
    name: "vips"
  }, {
    path: "/abstract/EPoster",
    component: _6e648bc6,
    name: "abstract-EPoster"
  }, {
    path: "/abstract/FreePapers",
    component: _7fbff56f,
    name: "abstract-FreePapers"
  }, {
    path: "/fees/add",
    component: _2891726c,
    name: "fees-add"
  }, {
    path: "/plenary/add",
    component: _f9a142d0,
    name: "plenary-add"
  }, {
    path: "/site-settings/abstract-submission",
    component: _055ef4c8,
    name: "site-settings-abstract-submission"
  }, {
    path: "/site-settings/banner",
    component: _a4dad16a,
    name: "site-settings-banner"
  }, {
    path: "/site-settings/event-schedule",
    component: _52d07aee,
    name: "site-settings-event-schedule"
  }, {
    path: "/site-settings/nav-settings",
    component: _4a572bec,
    name: "site-settings-nav-settings"
  }, {
    path: "/site-settings/page-access",
    component: _4a1380d3,
    name: "site-settings-page-access"
  }, {
    path: "/site-settings/page-iframes",
    component: _3b3eb570,
    name: "site-settings-page-iframes"
  }, {
    path: "/site-settings/privacy-policy",
    component: _5f33d294,
    name: "site-settings-privacy-policy"
  }, {
    path: "/site-settings/registration",
    component: _2e107118,
    name: "site-settings-registration"
  }, {
    path: "/site-settings/terms-and-conditions",
    component: _5a172d53,
    name: "site-settings-terms-and-conditions"
  }, {
    path: "/site-settings/vcc",
    component: _e405ee72,
    name: "site-settings-vcc"
  }, {
    path: "/site-settings/vods",
    component: _d84efc8a,
    name: "site-settings-vods"
  }, {
    path: "/site-settings/welcome-message",
    component: _7cb52d8d,
    name: "site-settings-welcome-message"
  }, {
    path: "/sponsors/add",
    component: _6e65b344,
    name: "sponsors-add"
  }, {
    path: "/sponsors/booth-designs",
    component: _2e94e3c7,
    name: "sponsors-booth-designs"
  }, {
    path: "/symposia/add",
    component: _7b0e1f1c,
    name: "symposia-add"
  }, {
    path: "/symposia/categories",
    component: _1bb21d47,
    name: "symposia-categories"
  }, {
    path: "/site-settings/vods/add",
    component: _1ec5f24a,
    name: "site-settings-vods-add"
  }, {
    path: "/sponsors/booth-designs/add",
    component: _350b6756,
    name: "sponsors-booth-designs-add"
  }, {
    path: "/symposia/categories/add",
    component: _332900d6,
    name: "symposia-categories-add"
  }, {
    path: "/site-settings/vods/edit/:id",
    component: _48c6704e,
    name: "site-settings-vods-edit-id"
  }, {
    path: "/sponsors/booth-designs/edit/:id",
    component: _1e0143e5,
    name: "sponsors-booth-designs-edit-id"
  }, {
    path: "/symposia/categories/edit/:id?",
    component: _5ee5bd65,
    name: "symposia-categories-edit-id"
  }, {
    path: "/delegates/edit/:id?",
    component: _2db8aadc,
    name: "delegates-edit-id"
  }, {
    path: "/fees/edit/:id?",
    component: _6e5cbc59,
    name: "fees-edit-id"
  }, {
    path: "/industry-lectures/edit/:id",
    component: _abe7a834,
    name: "industry-lectures-edit-id"
  }, {
    path: "/plenary/edit/:id",
    component: _67d038fb,
    name: "plenary-edit-id"
  }, {
    path: "/sponsors/edit/:id",
    component: _0297c2f5,
    name: "sponsors-edit-id"
  }, {
    path: "/symposia/edit/:id?",
    component: _24928801,
    name: "symposia-edit-id"
  }, {
    path: "/vips/edit/:id?",
    component: _5ad22a20,
    name: "vips-edit-id"
  }, {
    path: "/sponsors/edit/:id?/brochures",
    component: _3a8bf560,
    name: "sponsors-edit-id-brochures"
  }, {
    path: "/sponsors/edit/:id?/product-catalogue",
    component: _45b66a94,
    name: "sponsors-edit-id-product-catalogue"
  }, {
    path: "/sponsors/edit/:id?/videos",
    component: _16af2bc6,
    name: "sponsors-edit-id-videos"
  }, {
    path: "/sponsors/edit/:id?/brochures/add",
    component: _cc2551c2,
    name: "sponsors-edit-id-brochures-add"
  }, {
    path: "/sponsors/edit/:id?/product-catalogue/add",
    component: _308a3d63,
    name: "sponsors-edit-id-product-catalogue-add"
  }, {
    path: "/sponsors/edit/:id?/videos/add",
    component: _0c4ee9a8,
    name: "sponsors-edit-id-videos-add"
  }, {
    path: "/sponsors/edit/:id?/brochures/edit/:brochure_id?",
    component: _2bcb0a53,
    name: "sponsors-edit-id-brochures-edit-brochure_id"
  }, {
    path: "/sponsors/edit/:id?/product-catalogue/edit/:catalog_id",
    component: _40342c18,
    name: "sponsors-edit-id-product-catalogue-edit-catalog_id"
  }, {
    path: "/sponsors/edit/:id?/videos/edit/:video_id?",
    component: _8e147d02,
    name: "sponsors-edit-id-videos-edit-video_id"
  }, {
    path: "/",
    component: _7a6b77f0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
