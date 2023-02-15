<template>
	<div class="content-header" id="edit-video">
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
                                    <div class="note color-FF2C2C" v-if="!$v.form.url.maxLength">Max of {{ $v.form.name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Position Number</label>
                                <div>
                                    <el-select v-model="$v.form.position_number.$model" class="w-100" placeholder="Position Number">
                                        <el-option
                                            v-for="option in positionNumberOptions"
                                            :key="option.id"
                                            :label="option.id + ' (' + option.name + ')'"
                                            :value="option.id" />
                                    </el-select>
                                    <div v-if="$v.form.position_number.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.position_number.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" :href="`/sponsors/edit/${$route.params.id}/videos`">
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
                id: null,
                sponsor_id: null,
                video_id: null,
                url: null,
                position_number: null,
            },

            positionNumberOptions: this.$store.state.sponsor_assets.videos.assetPositions,
		}
	},
    validations: {
        form: {
            url: {
                required,
                maxLength: maxLength(1000)
            },
            position_number: {
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
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.save()
            }
        },
        getVideo() {
            let data = {
                id: this.$route.params.id,
                video_id: this.$route.params.video_id,
            }
            this.$store.dispatch("sponsor_assets/videos/getVideo", data)
            .then(res => {
                let data = res.data
                this.form.id = this.form.sponsor_id = data.sponsor_id
                this.form.video_id = data.id
                this.form.url = data.url
                this.form.position_number = data.position_number
            })
            .catch(err => {
                this.$message.error(err)
            });
        },
        save() {
            disableButton('.btn-save', true)
            this.$store.dispatch("sponsor_assets/videos/update", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push(`/sponsors/edit/${this.$route.params.id}/videos`)
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Videos')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        setTimeout(() => {
            this.getVideo();
        }, 1000);
    } 
}
</script>