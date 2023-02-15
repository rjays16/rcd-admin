<template>
    <div class="modal fade" id="ideapayInputs" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-12 text-left px-0">
                        <button type="button" class="close btn-close" @click="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h6 class="modal-title montserrat-bold text-capitalize">Ideapay Details</h6>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label>Payment Reference</label>
                        <el-input placeholder="Payment Reference" class="w-100" v-model="$v.form.payment_ref.$model" />
                        <div v-if="$v.form.payment_ref.$dirty">
                            <div class="note color-FF2C2C" v-if="!$v.form.payment_ref.required">Required Field</div>
                            <div class="note color-FF2C2C" v-if="!$v.form.payment_ref.maxLength">Max of {{ $v.form.payment_ref.$params.maxLength.max }} characters.</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label>Payment URL</label>
                        <el-input placeholder="Payment URL" class="w-100" v-model="$v.form.payment_url.$model" />
                        <div v-if="$v.form.payment_url.$dirty">
                            <div class="note color-FF2C2C" v-if="!$v.form.payment_url.required">Required Field</div>
                            <div class="note color-FF2C2C" v-if="!$v.form.payment_url.maxLength">Max of {{ $v.form.payment_url.$params.maxLength.max }} characters.</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-blue btn-save white px-4 py-2" @click="recheckInputs">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { required, maxLength } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            order: null,

            form: {
                payment_ref: null,
                payment_url: null,
            }
        }
    },
    validations: {
        form: {
            payment_ref: {
                required,
                maxLength: maxLength(255)
            },
            payment_url: {
                required,
                maxLength: maxLength(255)
            },
        }
    },
    methods: {
        openModal(order, selected_status) {
            this.order = order
            this.selected_status = selected_status
            $(function() {
                $('#ideapayInputs').modal('show');
            });
        },
        close() {
            $(function() {
                $('#ideapayInputs').modal('hide');
            });
        },
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.save()
            }
        },
        save() {
            let data = {
                convention_member_id: this.order.member.id,
                order_id: this.order.id,
                status: this.selected_status,
                payment_ref: this.form.payment_ref,
                payment_url: this.form.payment_url
            }

            disableButton('.btn-save', true)
            this.$store.dispatch("members/updateOrder", data)
            .then(res => {
                disableButton('.btn-save', false)
                this.$message.success(res.data.message)
                // console.log(this.$parent)
                this.$parent.close()
                this.$parent.$parent.getOrders()
                this.close()
            })
            .catch(err => {
                disableButton('.btn-save', false)
                this.$message.error(err)
            })
        },
        saveAndClose(order) {
            this.save(order)
            this.close()
        }
    },
}
</script>