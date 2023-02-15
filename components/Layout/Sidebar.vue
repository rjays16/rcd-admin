<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <span class="brand-link text-center p-2">
            <span class="brand-text font-weight-light">
                <img :src="sidebarLogo" alt="Admin Logo">
            </span>
        </span>
        <div class="sidebar pt-2 dmsans-bold">
            <div class="sidebar-container">
                <el-menu
                    class="el-menu-sidebar mh-75"
                    unique-opened
                    router
                    text-color="#ffffff"
                    active-text-color="#fff"
                    ref="menuSidebar"
                    v-loading="is_loading"
                    element-loading-text="Loading..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-menu-item index="/dashboard" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-table"></i>
                        </div>
                        <span>Dashboard</span>
                    </el-menu-item>
                    <el-menu-item index="/delegates" @click="closeSubmenu" v-if="admin_capabilities.delegates">
                        <div class="container-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <span>Delegates</span>
                    </el-menu-item>
                    <el-submenu index="abstract" ref="abstract" @click="closeSubmenu" v-if="admin_capabilities.abstracts">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-file-invoice"></i>
                            </div>
                            <span>Abstract</span>
                        </template>
                        <el-menu-item index="/abstract/categories" class="adjust">
                            <span>Categories</span>
                        </el-menu-item>
                        <el-menu-item index="/abstract/EPoster" class="adjust">
                            <span>E-Poster</span>
                        </el-menu-item>
                        <el-menu-item index="/abstract/FreePapers" class="adjust">
                            <span>Free Papers</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/vips" @click="closeSubmenu" v-if="admin_capabilities.vip">
                        <div class="container-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <span>VIP</span>
                    </el-menu-item>
                    <el-menu-item index="/fees" @click="closeSubmenu" v-if="admin_capabilities.fees">
                        <div class="container-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <span>Fees</span>
                    </el-menu-item>
                    <el-menu-item index="/payments" @click="closeSubmenu" v-if="admin_capabilities.payments">
                        <div class="container-icon">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <span>Payments</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/orders" @click="closeSubmenu" v-if="admin_capabilities.orders">
                        <div class="container-icon">
                            <i class="fas fa-clipboard"></i>
                        </div>
                        <span>Orders</span>
                    </el-menu-item> -->
                    <el-submenu index="sponsors" ref="sponsors" @click="closeSubmenu" v-if="admin_capabilities.sponsors">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-person-booth"></i>
                            </div>
                            <span>Sponsors</span>
                        </template>
                        <el-menu-item index="/sponsors">
                            <i class="fas fa-circle"></i>
                            Sponsor List
                        </el-menu-item>
                        <el-menu-item index="/sponsors/booth-designs">
                            <i class="fas fa-circle"></i>
                            Booth Designs
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/plenary" @click="closeSubmenu" v-if="admin_capabilities.plenary">
                        <div class="container-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <span>Plenary</span>
                    </el-menu-item>
                    <el-submenu index="attendance" ref="attendance" @click="closeSubmenu">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-clipboard"></i>
                            </div>
                            <span>Attendance</span>
                        </template>
                        <el-menu-item index="/attendees/plenary" title="Plenary">
                            <i class="fas fa-circle"></i>
                            <span>Plenary</span>
                        </el-menu-item>
                        <el-menu-item index="/attendees/workshop" title="Workshop">
                            <i class="fas fa-circle"></i>
                            <span>Workshop</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="ondemand-logs" ref="ondemand-logs" @click="closeSubmenu">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-clipboard"></i>
                            </div>
                            <span>On Demand Logs</span>
                        </template>
                        <el-menu-item index="/ondemand-logs/plenary" title="Plenary">
                            <i class="fas fa-circle"></i>
                            <span>Plenary</span>
                        </el-menu-item>
                        <el-menu-item index="/ondemand-logs/workshop" title="Workshop">
                            <i class="fas fa-circle"></i>
                            <span>Workshop</span>
                        </el-menu-item>
                        <el-menu-item index="/ondemand-logs/symposia" title="Symposia">
                            <i class="fas fa-circle"></i>
                            <span>Symposia</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="symposia" ref="symposia" @click="closeSubmenu" v-if="admin_capabilities.symposia">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-microphone"></i>
                            </div>
                            <span>Symposia</span>
                        </template>
                        <el-menu-item index="/symposia/categories">
                            <i class="fas fa-circle"></i>
                            Categories
                        </el-menu-item>
                        <el-menu-item index="/symposia">
                            <i class="fas fa-circle"></i>
                            Events
                        </el-menu-item>
                        <el-menu-item index="/symposia/views">
                            <i class="fas fa-circle"></i>
                            Views
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/industry-lectures" @click="closeSubmenu" v-if="admin_capabilities.industry_lecture">
                        <div class="container-icon">
                            <i class="fas fa-tv"></i>
                        </div>
                        <span>Industry Lectures</span>
                    </el-menu-item>                    
                    <el-menu-item index="/industry-logs" @click="closeSubmenu" v-if="admin_capabilities.plenary">
                        <div class="container-icon">
                            <i class="fas fa-clipboard"></i>
                        </div>
                        <span>Industry Logs</span>
                    </el-menu-item>
                    <el-submenu index="site-settings" ref="site-settings" @click="closeSubmenu" v-if="admin_capabilities.site_settings">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <span>Site Settings</span>
                        </template>
                        <el-menu-item index="/site-settings/privacy-policy" class="d-none">
                            <i class="fas fa-circle"></i>
                            Privacy Policy
                        </el-menu-item>
                        <el-menu-item index="/site-settings/terms-and-conditions" class="d-none">
                            <i class="fas fa-circle"></i>
                            Terms and Conditions
                        </el-menu-item>
                        <el-menu-item index="/site-settings/page-iframes" class="d-none">
                            <i class="fas fa-circle"></i>
                            Page Iframes
                        </el-menu-item>
                        <el-menu-item index="/site-settings/registration">
                            <i class="fas fa-circle"></i>
                            <span>Registration Switch</span>
                        </el-menu-item>
                        <el-menu-item index="/site-settings/abstract-submission">
                            <i class="fas fa-circle"></i>
                            <span>Abstract Switch</span>
                        </el-menu-item>
                        <el-menu-item index="/site-settings/payment-switch">
                            <i class="fas fa-circle"></i>
                            <span>Workshop Payment Switch</span>
                        </el-menu-item>
                        <el-menu-item index="/site-settings/vcc" title="Virtual Convention Center">
                            <i class="fas fa-circle"></i>
                            <span>VCC</span>
                        </el-menu-item>
                        <el-menu-item index="/site-settings/reset-delegate-password" title="Reset Delegate Password">
                            <i class="fas fa-circle"></i>
                            <span>Reset Delegate Password</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
	data() {
		return {
            searchTerm: null,
			sidebarLogo: require('~/static/img/logo-rcd2022.png'),
            submenus: ["abstract", "sponsors", "attendance", "ondemand-logs", "symposia", "site-settings"],

            super_admin_type: this.$store.state.auth.super_admin_type,
            admin_type: this.$store.state.auth.admin_type,
			user_role: this.$store.state.auth.user_role,

            admin_capabilities: [],

            is_loading: true
		}
	},
    methods: {
        closeSubmenu() {
            let self = this
            this.submenus.forEach(function(submenu) {
                self.$refs.menuSidebar.close(submenu)
            });
        },
        getUser() {
            this.$store.dispatch("auth/getUser")
            .then(res => {
                let user_data = res.data
                this.admin_capabilities = user_data.admin_capability
                this.is_loading = false
            })
            .catch(err => {
                console.error(err)
                this.is_loading = false
            })
        },
    },
    mounted() {
        $('.el-submenu__title').on('click', function(e) {
            $('.el-menu-item').not('.sub-item.is-active').removeClass('active')
        });        
    },
    async fetch() {
        this.getUser()
    }
}
</script>

<style lang="scss" scoped>
.el-menu .el-menu--inline{
 background-color: white!important;
}
.adjust {
  margin-left: 20%;
  background-color: white!important;
}
.main-sidebar {
    background: white!important;
    .sidebar {
        overflow-y: scroll;
        margin-top: calc(3.5rem + 40px)!important;
    }
    .brand-link {
        background: white!important;
        border-bottom: none;
        span {
            img {
                width: 150px;
                padding: 11px 0;
            }
        }
    }
    .sidebar-container {
        .el-menu-sidebar {
            border: none;
            font-size: 2rem;
            i {
                &.fa, &.fas, &.far {
                    color: #9a9aa9;
                    margin-right: 0.5rem;
                    width: 15px;
                }
            }
            .container-icon {
                display: inline-block;
                margin-right: 0.5rem;
            }
            .el-menu-item {
                border-radius: 0px;
                background-color:white!important;
                span {
                    color:#838a95;
                    font-size: 14px;
                }
                &.is-active {
                    *, * > * {
                        color:#0776BC;
                    }
                }
                .notice-badge {
                    background: #838a95;
                    padding: 0px 5px;
                    font-size: 0.8rem;
                    margin-left: 10px;
                }
                &.active {
                    background: #838a95!important;
                    border-radius: 0px;
                    color: #0776BC!important;
                    .container-icon {
                        background: #0776BC;
                        border-radius: 50%;
                        padding: 7px;
                        height: 30px;
                        width: 30px;
                        margin-left: -8px;
                        margin-right: 9px;
                        text-align: center;
                    }
                    i {
                        margin: 0 auto;
                        left: 19px;
                        position: absolute;
                        &.fa, &.fas, &.far {
                            color: #0776BC;
                        }
                    }
                }
            }
            .el-submenu {
                &.is-opened {
                    ::v-deep .el-submenu__title {
                        border-radius: 0px;
                        background-color: white!important;
                        .container-icon {
                            padding: 7px;
                            height: 30px;
                            width: 30px;
                            margin-left: -8px;
                            margin-right: 9px;
                            text-align: center;
                        }
                        i:not(.el-icon-arrow-down) {
                            margin: 0 auto;
                            left: 19px;
                            position: absolute;
                        }
                    }
                }
                .el-menu-item {
                    padding-left: 15px!important;
                    font-size: 14px;
                    background-color: white!important;
                    color: #838a95!important;
                    &.active {
                        i {
                            margin-right: 0.5rem;
                            position: initial;
                        }
                    }
                }
                ::v-deep .el-submenu__title {
                    background-color: white!important;
                    * {
                        color: #838a95;
                    }
                }
            }
            .multi-menu {
                ::v-deep {
                    .el-menu-item-group__title {
                        color: #EB7E10;
                        font-size: 13px;
                        > * {
                            color: #EB7E10;
                        }
                    }
                    .far, .fas {
                        margin-right: 0.5rem;
                    }
                }
            }
        }
    }
}
</style>
