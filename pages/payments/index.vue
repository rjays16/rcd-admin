<template>
  <section>
	<div class="content-header" id="payments">
        <div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<button class="btn btn-blue btn-export border" @click="exportPayments">
							Export
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-lg-4 col-md-12 mb-2">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="searchPayments" @clear="getPayments(null)" suffix-icon="el-icon-search" clearable />
                    </div>
					<div class="col-lg-8 col-md-12 mb-2 text-right d-none">
						<button class="btn btn-blue btn-get-all py-2" @click="getPayments(true)">
							Show All Payments
						</button>
                    </div>
                </div>
				<div class="row">
					<b-table
						hover
						:items="payments"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="paymentCriteria"
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
						<template v-slot:cell(date_paid)="row">
							{{ new Date(row.item.date_paid) | moment("MMMM D, YYYY") }}
						</template>
						<template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
								<!-- <button class="btn btn-blue mb-2" :class="'btn-resend-payment-' + row.item.order.payment.id"
									@click="resendPaymentEmail(row.item)" title="Resend Payment Email">
									<i class="fas fa-envelope"></i>
								</button> -->
                				<button class="btn btn-blue mb-2" @click="viewPayments(row.item.convention_member_id)">
									<i class="fas fa-eye"></i>
								</button>
							</div>
						</template>
						<template #empty>
							<div class="text-center">
								No payments found.
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
	</div>
    <ModalPayments ref="ViewPayment"/>
  </section>
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
				{ key: 'member.registration_type.name', label: 'Delegate Type', tdClass: "align-middle", sortable: true },
				{
					key: 'amount', label: 'Total Payment', tdClass: "align-middle", sortable: true,
					formatter(value) {
						return formatDecimal(value, 2)
					}
				},
                { key: 'method.name', label: 'Payment Method', tdClass: "align-middle", sortable: true },
                { key: 'order.order_status_name', label: 'Status', tdClass: "align-middle", sortable: true },
                { key: 'date_paid', label: 'Date Paid', tdClass: "align-middle", sortable: true },
				{ key: 'action', label: 'Action', thClass: "text-center", tdClass: "align-middle" },
			],

			rows: 0,
			currentPage: 1,
			perPage: 10,
			paymentCriteria: '',
            paymentFilterTimeout: null,
			isBusy: true,
		}
	},
	computed: {
		...mapGetters({
            payments: 'payments/getPayments',
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
            clearTimeout(this.paymentFilterTimeout)
            this.paymentFilterTimeout = setTimeout(() => {
                this.paymentCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getPayments(show_all) {
			let data = {
                is_search: null,
                keyword: null,
				show_all: show_all
            }

			this.isBusy = true
			disableButton('.btn-get-all', true)
			this.$store.dispatch("payments/getPayments", data)
			.then(res => {
				this.rows = this.payments.length
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
		},
		viewPayments(id){
			this.$refs.ViewPayment.openmodal(id, true)
		},
		searchPayments() {
			let value = this.searchTerm
            if(value.length >= 4) {
                let data = {
                    is_search: true,
                    keyword: value,
                }

				this.isBusy = true
                this.$store.dispatch("payments/getPayments", data)
                .then((res) => {
					this.rows = this.payments.length
					this.isBusy = false
                })
                .catch((err) => {
					this.$message.error(err)
					this.isBusy = false
                })
            } else if(value.length == 0) {
				this.getPayments(null)
			}
        },
        exportPayments() {
            disableButton('.btn-export', true)
			this.$store.dispatch("payments/export")
			.then(res => {
				const url = URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', "payments.xlsx")
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
				disableButton('.btn-export', false)
			})
			.catch(err => {
				this.$message.error('Could not export the template. Please contact the site admin.')
				disableButton('.btn-export', false)
			})
        },
		resendPaymentEmail(ledger_item) {
            this.$confirm('This will resend the payment email to the member. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let data = {
                    member_id: ledger_item.member.id,
                    payment_id: ledger_item.order.payment.id
                }

                disableButton('.btn-resend-payment-' + ledger_item.order.payment.id, true)
                this.$store.dispatch("members/resendPaymentEmail", data)
                .then((res) => {
                    this.$message.success(res.data.message)
                    disableButton('.btn-resend-payment-' + ledger_item.order.payment.id, false)
                })
                .catch((err) => {
                    this.$message.error(err)
                    disableButton('.btn-resend-payment-' + ledger_item.order.payment.id, false)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancelled'
                });
            });
		},
	},
    mounted() {
		this.setNavbarTitle('Payments')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getPayments(null)
    }
}
</script>
