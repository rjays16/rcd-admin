<template>
	<div class="content-header" id="add-symposia">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Card Title</label>
                                <el-input placeholder="Title" v-model="$v.form.card_title.$model" />
                                <div v-if="$v.form.card_title.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.card_title.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.card_title.maxLength">Max of {{ $v.form.card_title.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Title</label>
                                <el-input placeholder="Title" v-model="$v.form.title.$model" />
                                <div v-if="$v.form.title.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.title.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.title.maxLength">Max of {{ $v.form.title.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                           <div class="mb-3">
                                <label>Author</label>
                                <el-input placeholder="Author" v-model="$v.form.author.$model" />
                                <div v-if="$v.form.author.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.author.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.author.maxLength">Max of {{ $v.form.title.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Thumbnail</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.thumbnail.$model" />
                                <div v-if="$v.form.thumbnail.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.thumbnail.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.thumbnail.maxLength">Max of {{ $v.form.thumbnail.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Video</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.video.$model" />
                                <div v-if="$v.form.video.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.video.maxLength">Max of {{ $v.form.video.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Category</label>
                                <div>
                                    <el-select v-model="$v.form.category_id.$model" class="w-100" placeholder="Category">
                                        <el-option
                                            v-for="option in symposiaCategories"
                                            :key="option.id"
                                            :label="option.title + ' (' + option.chair + ')'"
                                            :value="option.id" />
                                    </el-select>
                                    <div v-if="$v.form.category_id.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.category_id.required">Required Field</div>
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
                card_title: null,
                title: null,
                author: null,
                thumbnail: null,
                video: null,
                category_id: null,
            },

            symposiaCategories: [],
		}
	},
    validations: {
        form: {
            card_title: {
                required,
                maxLength: maxLength(300)
            },
            title: {
                required,
                maxLength: maxLength(300)
            },
            author: {
                required,
                maxLength: maxLength(300)
            },
            thumbnail: {
                required,
                maxLength: maxLength(500)
            },
            video: {
                maxLength: maxLength(500)
            },
            category_id: {
                required
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
        getSymposiaCategories() {
			this.$store.dispatch("symposia/getCategories")
			.then(res => {
				this.symposiaCategories = res.data
			})
			.catch(err => {
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
            
            this.$store.dispatch("symposia/createEvent", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/symposia')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Symposia')
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')

        this.getSymposiaCategories()
    } 
}
</script>