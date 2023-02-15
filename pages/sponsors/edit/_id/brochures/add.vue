<template>
	<div class="content-header" id="add-brochure">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>URL</label>
                                <el-input type="textarea" placeholder="URL" v-model="$v.form.url.$model" :rows="4" />
                                <div v-if="$v.form.url.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.url.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.url.maxLength">Max of {{ $v.form.url.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" :href="`/sponsors/edit/${$route.params.id}/brochures`">
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
import { mapGetters } from "vuex"
import { required, maxLength } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                url: null,
            },
		}
	},
    computed: {
        ...mapGetters({
            user: 'auth/user',
        }),
    },
    validations: {
        form: {
            url: {
                required,
                maxLength: maxLength(500)
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
            this.form.id = this.form.sponsor_id = this.$route.params.id
            this.$store.dispatch("sponsor_assets/brochures/create", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push(`/sponsors/edit/${this.$route.params.id}/brochures`)
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Brochures')
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')
    } 
}
</script>