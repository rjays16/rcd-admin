<template>
	<div class="content-header" id="edit-abstract-category">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Name</label>
                                <el-input v-model="$v.form.category_value.$model" />
                                <div v-if="$v.form.category_value.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.category_value.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.category_value.maxLength">Max of {{ $v.form.category_value.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/abstract/categories">
                                    Cancel
                                </a>
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
                category_value: null,
            },
		}
	},
    validations: {
        form: {
            category_value: {
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
        getAbstractCategory() {
			this.$store.dispatch("abstract/getCategory", this.$route.params.id)
			.then(res => {
                this.form = res.data
			})
			.catch(err => {
                console.error(err)
				this.$message.error(err)
			})
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
            
            this.$store.dispatch("abstract/updateCategory", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/abstract/categories')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Abstract Category')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getAbstractCategory()
    } 
}
</script>