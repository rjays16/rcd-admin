<template>
    <div class="modal fade" id="memberOrders" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-12 text-left px-0">
                        <button type="button" class="close btn-close" @click="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h6 class="modal-title montserrat-bold text-capitalize">Member: {{ member_name }}</h6>
                    </div>
                </div>
                <div class="modal-body">
                    <b-table
						hover 
						:items="orders" 
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:responsive="true"
						:busy="isBusy"
						:show-empty="rows == 0">
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
						<template v-slot:cell(status_list)>
                            <el-select v-model="selected_status" class="w-auto" placeholder="Select Status" @change="changeStatus">
                                <el-option
                                    v-for="option in order_statuses"
                                    :key="option.id"
                                    :label="option.name"
                                    :value="option.id" />
                            </el-select>
						</template>
                        <template v-slot:cell(action)="row">
                            <button type="button" class="btn btn-blue btn-send white btn-submit px-4 py-2" @click="recheckInputs(row.item)">
                                Update Status
                            </button>
                        </template>
					</b-table>
					<div class="w-100 m-2" v-if="rows > 10">  
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

        <ModalIdeapayPaymentDetails ref="ideapayPaymentDetails" />
    </div>
</template>

<script>
import $ from 'jquery';
import { formatDecimal } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            member_name: "",
            orders: [],

            fields: [
                {
                    key: 'amount', label: 'Fee Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                {
                    key: 'first_payment.amount', label: 'Paid Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
				{ key: 'status_list', label: 'Status', thClass: "text-center", tdClass: "text-center align-middle" },
                { key: 'action', label: 'Action', thClass: "text-center", tdClass: "text-center align-middle" },
			],
			
			currentPage: 1,
			perPage: 10,
			isBusy: true,

            order_statuses: this.$store.state.members.order_statuses,
            selected_status: null,

            nonCompletedStatus: [1, 3],
            payment_ref: null,
            payment_url: null
        }
    },
    computed: {
        rows() {
            return this.orders.length
        }
    },
    methods: {
        openModal(id, member_name) {
            this.orders = []
            this.member_name = ""
            this.$store.dispatch("members/getOrders", id)
			.then(res => {
                this.orders = res.data
                this.member_name = member_name
                this.isBusy = false
                this.selected_status = this.orders[0].status
                // console.log(this.selected_status)
                $(function() {
                    $('#memberOrders').modal('show');
                });
			})
			.catch(err => {
				this.$message.error(err)
                this.isBusy = false
			})
        },
        close() {
            $(function() {
                $('#memberOrders').modal('hide');
            });
        },
        changeStatus(status_id) {
            // console.log(status_id)
            this.selected_status = status_id
        },
        recheckInputs(order) {
            if(!order.member) {
                this.$message.error("Unable to retrieve member data.")
            } else {
                // Check if the current order status is completed
                console.log("Order Status: ", order.status)
                if(order.status == 2) {
                    // Check if the order already has a payment
                    console.log("First Payment: ", order.first_payment)
                    if(order.first_payment != null) {
                        console.log("Selected Status: ", this.selected_status)
                        // AND if the user is attempting to change it's status from COMPLETED to PENDING or FAILED
                        if(this.selected_status != 2) {
                            this.$confirm('This order is already marked as COMPLETED and has payment data recorded. Continue?', 'Warning', {
                                confirmButtonText: 'OK',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                            }).then(() => {
                                this.saveAndClose(order)
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: 'Action Cancelled'
                                });
                            });
                        } else {
                            // Allow to save otherwise
                            this.saveAndClose(order)
                        }
                    } else {
                        // AND if the order doesn't have a payment
                        if(this.selected_status == 2) {
                            this.promptIdeapayInputs(order) // Ask the user to input the ideapay details
                        } else {
                            // AND the user is attempting to change it's status to PENDING or FAILED
                            this.saveAndClose(order)
                        }
                    }
                } else {
                    if(this.nonCompletedStatus.includes(order.status) && this.selected_status == 2) {
                        this.promptIdeapayInputs(order) // Ask the user to input the ideapay details
                    } else {
                        this.saveAndClose(order)
                    }
                }
            }
        },
        promptIdeapayInputs(order) {
            if(order.member == null) {
				this.$message.error("Unable to retrieve the member data.")
			} else {
				this.$refs.ideapayPaymentDetails.openModal(order, this.selected_status)
			}
        },
        save(order) {
            let data = {
                convention_member_id: order.member.id,
                order_id: order.id,
                status: this.selected_status
            }

            this.$store.dispatch("members/updateOrder", data)
            .then(res => {
                this.$message.success(res.data.message)
                // console.log(this.$parent)
                this.$parent.getOrders()
            })
            .catch(err => {
                this.$message.error(err)
            })
        },
        saveAndClose(order) {
            this.save(order)
            this.close()
        }
    }
}
</script>