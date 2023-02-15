<template>
	<div class="content-header" id="orders">
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-lg-4 col-md-12 mb-2">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="searchOrders" @clear="getOrders(null)" suffix-icon="el-icon-search" clearable />
                    </div>
					<div class="col-lg-8 col-md-12 mb-2 text-right">
						<button class="btn btn-blue btn-get-all py-2" @click="getOrders(true)">
							Show All Orders
						</button>
                    </div>
                </div>
				<div class="row">
					<b-table
						hover 
						:items="orders"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="orderCriteria"
						:responsive="true"
						:busy="isBusy"
						class="m-2"
						:show-empty="rows == 0"
						@filtered="onFiltered">
						<template slot="table-busy">
							<div class="text-center text-success my-2">
								<b-spinner class="align-middle"></b-spinner>
								<strong>Loading...</strong>
							</div>
						</template>
						<template #empty>
							<div class="text-center">
								No orders found.
							</div>
						</template>
						<template v-slot:head(action)>
							{{ adminCapability.can_update_orders ? "Action" : "" }}
						</template>
                        <template v-slot:cell(action)="row" v-if="adminCapability.can_update_orders">
							<div class="actions same-size text-center">
								<button class="btn btn-blue mb-2" @click="showOrder(row.item, row.item.member.user.full_name)">
									<i class="fas fa-edit"></i>
								</button>
							</div>
						</template>
					</b-table>
					<div class="w-100 m-2" v-if="rows > 0">  
						<b-pagination
							v-model="currentPage"
							:total-rows="rows"
							:per-page="perPage"
							class="float-right green-pagination"
							prev-text="Previous"
							next-text="Next"
							first-number
							last-number
						></b-pagination>
					</div>
				</div>
			</div>
		</div>

		<ModalMemberOrders ref="memberOrdersModal" />
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { disableButton, formatDecimal } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,
			
			fields: [
				{ key: 'member.user.full_name', label: 'Member Name', tdClass: "align-middle", sortable: true },
				{ key: 'member.user.email', label: 'Email', tdClass: "align-middle", sortable: true },
				{ key: 'order_description', label: 'Description', tdClass: "align-middle", sortable: true,
					formatter(value) {
						return value ? value : "Member Fees"
					}
				},
                { key: 'order_status_name', label: 'Status', tdClass: "align-middle", sortable: true },
                { key: 'action', label: 'Action', tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			orderCriteria: '',
            orderFilterTimeout: null,
			isBusy: true,
		}
	},
	computed: {
		...mapGetters({
            orders: 'orders/getOrders',
			adminCapability: 'auth/adminCapability',
        }),
	},
	methods: {
        setNavbarTitle(title) {
            this.$store.commit('SET_NAVBAR_TITLE', title)
        },
		setNavbarIcon(icon) {
            this.$store.commit('SET_NAVBAR_ICON', icon)
        },
		setNavbarSubpageTitle(subtitle) {
            this.$store.commit('SET_NAVBAR_SUBPAGE_TITLE', subtitle)
        },
		formatDecimal(value, places) {
			return formatDecimal(value, places)
		},
		search() {
            this.isBusy = true
            clearTimeout(this.orderFilterTimeout)
            this.orderFilterTimeout = setTimeout(() => {
                this.orderCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getOrders(show_all) {
			let data = {
                is_search: null,
                keyword: null,
				show_all: show_all
            }
			
			this.isBusy = true
			disableButton('.btn-get-all', true)
			this.$store.dispatch("orders/getOrders", data)
			.then(res => {
				this.rows = this.orders.length
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
		},
		searchOrders() {
			let value = this.searchTerm
            if(value.length >= 4) {
                let data = {
                    is_search: true,
                    keyword: value,
                }

				this.isBusy = true
                this.$store.dispatch("orders/getOrders", data)
                .then((res) => {
					this.rows = this.orders.length
					this.isBusy = false
                })
                .catch((err) => {
					this.$message.error(err)
					this.isBusy = false
                })
            } else if(value.length == 0) {
				this.getOrders(null)
			}
        },
		showOrder(order, member_name) {
			if(order.member == null) {
				this.$message.error("Unable to retrieve the member data.")
			} else {
				this.$refs.memberOrdersModal.openModal(order.member.id, member_name)
			}
		}
	},
    mounted() {
		this.setNavbarTitle('Orders')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getOrders(null)
    },
	async fetch() {
		this.$router.push('/dashboard')
		return
	}
}
</script>