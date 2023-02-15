<template>
	<div class="content-header" id="edit-industry-lecture">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Lecture Video</label>
                                <el-input type="textarea" v-model="$v.form.lecture.$model" :rows="4" />
                                <div v-if="$v.form.lecture.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.lecture.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.lecture.maxLength">Max of {{ $v.form.lecture.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Background</label>
                                <el-input type="textarea" v-model="$v.form.lecture_background.$model" :rows="4" />
                                <div v-if="$v.form.lecture_background.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.lecture_background.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.lecture_background.maxLength">Max of {{ $v.form.lecture_background.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/industry-lectures">
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
                id: this.$route.params.id,
                lecture: null,
                lecture_background: null,
            },
		}
	},
    validations: {
        form: {
            lecture: {
                required,
                maxLength: maxLength(700)
            },
            lecture_background: {
                required,
                maxLength: maxLength(700)
            }
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
        getLecture() {
            this.$store.dispatch("industry-lectures/getLecture", this.$route.params.id)
            .then(res => {
                let data = res.data
                this.form.lecture = data.lecture
                this.form.lecture_background = data.lecture_background
            })
            .catch(err => {
                console.error(err)
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
            this.$store.dispatch("industry-lectures/update", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                this.getLecture()
                disableButton('.btn-save', false)
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Industry Lecture')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getLecture()
    } 
}
</script>