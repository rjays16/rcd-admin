<template>
	<div class="content-header" id="add-plenary">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Date</label>
                                <div>
                                    <el-select v-model="$v.form.date.$model" class="w-100" placeholder="Date">
                                        <el-option
                                            v-for="option in plenaryDays"
                                            :key="option.id"
                                            :label="option.title + ' (' + option.date + ')'"
                                            :value="option.date" />
                                    </el-select>
                                    <div v-if="$v.form.date.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.date.required">Required Field</div>
                                    </div>
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
                                <label>Speaker/Description</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.speaker_description.$model" />
                                <div v-if="$v.form.speaker_description.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.speaker_description.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.speaker_description.maxLength">Max of {{ $v.form.speaker_description.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Starts At</label>
                                <div>
                                    <el-time-select v-model="$v.form.starts_at.$model" :picker-options="{ start: '08:00', step: '00:05', end: '23:30' }" placeholder="Select time" />
                                    <div v-if="$v.form.starts_at.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.starts_at.required">Required Field</div>
                                        <div class="note color-FF2C2C" v-if="!$v.form.starts_at.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Ends At</label>
                                <div>
                                    <el-time-select v-model="$v.form.ends_at.$model" :picker-options="{ start: '08:00', step: '00:05', end: '23:30' }" placeholder="Select time" />
                                    <div v-if="$v.form.ends_at.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.ends_at.required">Required Field</div>
                                        <div class="note color-FF2C2C" v-if="!$v.form.ends_at.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Header Color</label>
                                <div>
                                    <el-select v-model="$v.form.header_color.$model" class="w-100" placeholder="Header Color">
                                        <el-option
                                            v-for="option in headerColors"
                                            :key="option.id"
                                            :label="option.name"
                                            :value="option.value" />
                                    </el-select>
                                    <div v-if="$v.form.header_color.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.header_color.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/plenary">
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
                date: null,
                title: null,
                phone: null,
                speaker_description: null,
                starts_at: null,
                ends_at: null,
                header_color: null,
            },

            plenaryDays: [],

            headerColors: this.$store.state.plenaries.headerColors,
		}
	},
    validations: {
        form: {
            date: {
                required
            },
            title: {
                required,
                maxLength: maxLength(255)
            },
            speaker_description: {
                required,
                maxLength: maxLength(255)
            },
            starts_at: {
                required
            },
            ends_at: {
                required
            },
            header_color: {
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
        getPlenaryDays() {
            this.$store.dispatch("plenaries/getPlenaryDays")
            .then(res => {
                this.plenaryDays = res.data
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
            
            this.$store.dispatch("plenaries/create", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/plenary')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Plenary')
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')

        this.getPlenaryDays()
    } 
}
</script>