import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  HelperFunctions: () => import('../..\\components\\Helper\\functions.js' /* webpackChunkName: "components/helper-functions" */).then(c => wrapFunctional(c.default || c)),
  LayoutFooter: () => import('../..\\components\\Layout\\Footer.vue' /* webpackChunkName: "components/layout-footer" */).then(c => wrapFunctional(c.default || c)),
  LayoutNavbar: () => import('../..\\components\\Layout\\Navbar.vue' /* webpackChunkName: "components/layout-navbar" */).then(c => wrapFunctional(c.default || c)),
  LayoutSidebar: () => import('../..\\components\\Layout\\Sidebar.vue' /* webpackChunkName: "components/layout-sidebar" */).then(c => wrapFunctional(c.default || c)),
  ModalPayments: () => import('../..\\components\\Modal\\Payments.vue' /* webpackChunkName: "components/modal-payments" */).then(c => wrapFunctional(c.default || c)),
  ModalSendingEmail: () => import('../..\\components\\Modal\\SendingEmail.vue' /* webpackChunkName: "components/modal-sending-email" */).then(c => wrapFunctional(c.default || c)),
  ModalAbstractEdit: () => import('../..\\components\\Modal\\Abstract\\Edit.vue' /* webpackChunkName: "components/modal-abstract-edit" */).then(c => wrapFunctional(c.default || c)),
  ModalAbstractPreview: () => import('../..\\components\\Modal\\Abstract\\Preview.vue' /* webpackChunkName: "components/modal-abstract-preview" */).then(c => wrapFunctional(c.default || c)),
  ModalIdeapayPaymentDetails: () => import('../..\\components\\Modal\\Ideapay\\PaymentDetails.vue' /* webpackChunkName: "components/modal-ideapay-payment-details" */).then(c => wrapFunctional(c.default || c)),
  ModalMemberOrders: () => import('../..\\components\\Modal\\Member\\Orders.vue' /* webpackChunkName: "components/modal-member-orders" */).then(c => wrapFunctional(c.default || c)),
  ModalMemberPayments: () => import('../..\\components\\Modal\\Member\\Payments.vue' /* webpackChunkName: "components/modal-member-payments" */).then(c => wrapFunctional(c.default || c)),
  ModalPasswordRequestReset: () => import('../..\\components\\Modal\\Password\\RequestReset.vue' /* webpackChunkName: "components/modal-password-request-reset" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
