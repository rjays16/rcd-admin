<template>
	<div class="content-header" id="reset-delegate-password">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Email</label>
                                    <div>
                                        <el-input v-model="$v.form.email.$model" class="w-50" />
                                        <div v-if="$v.form.email.$dirty">
                                            <div class="note color-FF2C2C" v-if="!$v.form.email.required">Required Field</div>
                                            <div class="note color-FF2C2C" v-if="!$v.form.email.maxLength">Max of {{ $v.form.email.$params.maxLength.max }} characters.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <button class="btn btn-green btn-save" @click="recheckInputs">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                email: null,
            },
		}
	},
    validations: {
        form: {
            email: {
                required,
                maxLength: maxLength(255)
            },
        }
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
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.save()
            }
        },
        save() {
            disableButton('.btn-save', true)
            this.$store.dispatch("members/setDefaultPassword", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                disableButton('.btn-save', false)
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Reset Delegate Password')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')
    } 
}
</script>