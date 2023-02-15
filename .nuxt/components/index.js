import { wrapFunctional } from './utils'

export { default as Logo } from '../..\\components\\Logo.vue'
export { default as HelperFunctions } from '../..\\components\\Helper\\functions.js'
export { default as LayoutFooter } from '../..\\components\\Layout\\Footer.vue'
export { default as LayoutNavbar } from '../..\\components\\Layout\\Navbar.vue'
export { default as LayoutSidebar } from '../..\\components\\Layout\\Sidebar.vue'
export { default as ModalPayments } from '../..\\components\\Modal\\Payments.vue'
export { default as ModalSendingEmail } from '../..\\components\\Modal\\SendingEmail.vue'
export { default as ModalAbstractEdit } from '../..\\components\\Modal\\Abstract\\Edit.vue'
export { default as ModalAbstractPreview } from '../..\\components\\Modal\\Abstract\\Preview.vue'
export { default as ModalIdeapayPaymentDetails } from '../..\\components\\Modal\\Ideapay\\PaymentDetails.vue'
export { default as ModalMemberOrders } from '../..\\components\\Modal\\Member\\Orders.vue'
export { default as ModalMemberPayments } from '../..\\components\\Modal\\Member\\Payments.vue'
export { default as ModalPasswordRequestReset } from '../..\\components\\Modal\\Password\\RequestReset.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyHelperFunctions = import('../..\\components\\Helper\\functions.js' /* webpackChunkName: "components/helper-functions" */).then(c => wrapFunctional(c.default || c))
export const LazyLayoutFooter = import('../..\\components\\Layout\\Footer.vue' /* webpackChunkName: "components/layout-footer" */).then(c => wrapFunctional(c.default || c))
export const LazyLayoutNavbar = import('../..\\components\\Layout\\Navbar.vue' /* webpackChunkName: "components/layout-navbar" */).then(c => wrapFunctional(c.default || c))
export const LazyLayoutSidebar = import('../..\\components\\Layout\\Sidebar.vue' /* webpackChunkName: "components/layout-sidebar" */).then(c => wrapFunctional(c.default || c))
export const LazyModalPayments = import('../..\\components\\Modal\\Payments.vue' /* webpackChunkName: "components/modal-payments" */).then(c => wrapFunctional(c.default || c))
export const LazyModalSendingEmail = import('../..\\components\\Modal\\SendingEmail.vue' /* webpackChunkName: "components/modal-sending-email" */).then(c => wrapFunctional(c.default || c))
export const LazyModalAbstractEdit = import('../..\\components\\Modal\\Abstract\\Edit.vue' /* webpackChunkName: "components/modal-abstract-edit" */).then(c => wrapFunctional(c.default || c))
export const LazyModalAbstractPreview = import('../..\\components\\Modal\\Abstract\\Preview.vue' /* webpackChunkName: "components/modal-abstract-preview" */).then(c => wrapFunctional(c.default || c))
export const LazyModalIdeapayPaymentDetails = import('../..\\components\\Modal\\Ideapay\\PaymentDetails.vue' /* webpackChunkName: "components/modal-ideapay-payment-details" */).then(c => wrapFunctional(c.default || c))
export const LazyModalMemberOrders = import('../..\\components\\Modal\\Member\\Orders.vue' /* webpackChunkName: "components/modal-member-orders" */).then(c => wrapFunctional(c.default || c))
export const LazyModalMemberPayments = import('../..\\components\\Modal\\Member\\Payments.vue' /* webpackChunkName: "components/modal-member-payments" */).then(c => wrapFunctional(c.default || c))
export const LazyModalPasswordRequestReset = import('../..\\components\\Modal\\Password\\RequestReset.vue' /* webpackChunkName: "components/modal-password-request-reset" */).then(c => wrapFunctional(c.default || c))
