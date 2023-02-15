<template>
	<div class="content-header" id="add-symposia-category">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Chair</label>
                                <el-input placeholder="Chair" v-model="$v.form.chair.$model" />
                                <div v-if="$v.form.chair.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.chair.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.chair.maxLength">Max of {{ $v.form.chair.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Title</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.title.$model" />
                                <div v-if="$v.form.title.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.title.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.title.maxLength">Max of {{ $v.form.title.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Subtitle</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.subtitle.$model" />
                                <div v-if="$v.form.subtitle.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.subtitle.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.subtitle.maxLength">Max of {{ $v.form.subtitle.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Card Header Color</label>
                                <div>
                                    <el-select v-model="$v.form.card_header_color.$model" class="w-100" placeholder="Header Color">
                                        <el-option
                                            v-for="option in cardHeaderColors"
                                            :key="option.id"
                                            :label="option.name"
                                            :value="option.value" />
                                    </el-select>
                                    <div v-if="$v.form.card_header_color.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.card_header_color.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/symposia/categories">
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
                chair: null,
                title: null,
                subtitle: null,
                card_header_color: null,
            },

            cardHeaderColors: this.$store.state.symposia.cardHeaderColors,
		}
	},
    validations: {
        form: {
            chair: {
                required,
                maxLength: maxLength(300)
            },
            title: {
                required,
                maxLength: maxLength(300)
            },
            subtitle: {
                required,
                maxLength: maxLength(300)
            },
            card_header_color: {
                required,
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
        getSymposiaCategory() {
			this.$store.dispatch("symposia/getCategory", this.$route.params.id)
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
            
            this.$store.dispatch("symposia/updateCategory", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/symposia/categories')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Symposia Category')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getSymposiaCategory()
    } 
}
</script>