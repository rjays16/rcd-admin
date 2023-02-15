<template>
	<div class="content-header" id="edit-sponsor">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Name</label>
                                <el-input placeholder="Name" v-model="$v.form.name.$model" />
                                <div v-if="$v.form.name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.name.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.name.maxLength">Max of {{ $v.form.name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Email</label>
                                <el-input placeholder="Email" v-model="$v.form.email.$model" />
                                <div v-if="$v.form.email.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.email.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.email.maxLength">Max of {{ $v.form.email.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Phone</label>
                                <vue-tel-input
                                    v-model="$v.form.phone.$model"
                                    :required="true"
                                    :autofocus="false"
                                    :validCharactersOnly="true"
                                    :disabledFetchingCountry="true"
                                    class="el-phone w-100"
                                    placeholder="Phone"
                                    defaultCountry="PH" />
                                <div v-if="$v.form.phone.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.phone.maxLength">Max of {{ $v.form.phone.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Description</label>
                                <vue-editor v-model="$v.form.description.$model" />
                                <div v-if="$v.form.description.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.description.maxLength">Max of {{ $v.form.description.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Type</label>
                                <el-select v-model="$v.form.sponsor_type_id.$model" placeholder="Select" class="w-100">
                                    <el-option
                                        v-for="option in sponsorTypes"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.id" />
                                </el-select>
                                <div v-if="$v.form.sponsor_type_id.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.sponsor_type_id.required">Required Field</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Logo</label>
                                <div class="image-upload regular">
                                    <img v-if="logo_img_url || form.logo" :src="logo_img_url || form.logo" class="avatar" />
                                    <i v-else class="far fa-image"></i>                                        
                                    <el-upload
                                        class="avatar-uploader"
                                        action="/"
                                        accept="image/png, image/jpeg, image/jpg"
                                        :auto-upload="false"
                                        :show-file-list="false"
                                        :on-change="onChangeLogo">
                                        <div class="choose-blue-bar text-left py-2 px-3">
                                            <button class="btn btn-white regular">
                                                Choose File
                                            </button>
                                            <span v-if="form.logo">{{ form.logo.name }}</span>
                                            <span v-else>No file chosen</span>
                                        </div>
                                    </el-upload>

                                    <div v-if="form.logo" class="text-left mt-3">
                                        <button class="btn btn-red" @click="deleteLogo()">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Interactive Profile</label>
                                <el-input type="textarea" v-model="form.interactive_profile" :rows="4" :maxlength="500" show-word-limit />
                            </div>

                            <div class="mb-3">
                                <label>Kuula Iframe</label>
                                <el-input type="textarea" v-model="form.kuula_iframe" :rows="8" />
                            </div>

                            <div class="mb-3">
                                <label>Booth Design</label>
                                <el-select v-model="form.booth_design_id" placeholder="Select" class="w-100">
                                    <el-option
                                        v-for="option in boothDesigns"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.id" />
                                </el-select>
                            </div>

                            <div class="mb-3">
                                <label>Website</label>
                                <el-input placeholder="Website" v-model="$v.form.website.$model" />
                                <div v-if="$v.form.website.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.website.maxLength">Max of {{ $v.form.website.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Convention Slug</label>
                                <el-input placeholder="Convention Slug" v-model="$v.form.slug.$model" />
                                <div v-if="$v.form.slug.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.slug.maxLength">Max of {{ $v.form.slug.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/sponsors">
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
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                name: null,
                email: null,
                phone: null,
                description: null,
                logo: null,
                interactive_profile: null,
                kuula_iframe: null,
                booth_design_id: null,
                website: null,
                sponsor_type_id: null,
                slug: null,
            },

            sponsorTypes: [],
            boothDesigns: [],

            logo_img_url: "",
            logo_img_url_change: false,
            logo_img_url_deleted: false,

            interactive_profile_img_url: "",
            interactive_profile_img_url_change: false,
            interactive_profile_img_url_deleted: false,
            
            image_types: ["image/png", "image/jpg", "image/jpeg"],
            file_max: 10000000,

            event_supporter_type: this.$store.state.sponsors.event_supporter_type,
		}
	},
    validations: {
        form: {
            name: {
                required,
                maxLength: maxLength(300)
            },
            email: {
                required,
                maxLength: maxLength(191)
            },
            phone: {
                maxLength: maxLength(191)
            },
            address: {
                maxLength: maxLength(500)
            },
            description: {
                maxLength: maxLength(700)
            },
            sponsor_type_id: {
                required,
            },
            website: {
                maxLength: maxLength(300)
            },
            slug: {
                maxLength: maxLength(191)
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
        onChangeLogo(file) {
            this.validateFile(file.raw, "photo", (result) => {
                if (result == true) {
                    this.form.logo = file.raw;
                    this.logo_img_url = URL.createObjectURL(file.raw);
                    this.logo_img_url_change = true;
                }
            });
        },
        onChangeMainBanner(file) {
            this.validateFile(file.raw, "photo", (result) => {
                if (result == true) {
                    this.form.interactive_profile = file.raw;
                    this.interactive_profile_img_url = URL.createObjectURL(file.raw);
                    this.interactive_profile_url_change = true;
                }
            });
        },
        validateFile(file, type, callback) {
            let valid_types = this.image_types;
            if (!file) {
                callback(false);
            } else if (file.size > this.file_max) {
                this.$message.error("File is too big!");
                callback(false);
            } else if (!valid_types.includes(file.type)) {
                this.$message.error("Invalid file type");
                callback(false);
            } else {
                callback(true);
            }
        },
        deleteLogo() {
            this.form.banner = null;
            this.logo_img_url = null;
            this.logo_img_url_change = true;
            this.logo_img_url_deleted = true;
        },
        deleteMainBanner() {
            this.form.banner = null;
            this.interactive_profile_img_url = null;
            this.interactive_profile_img_url_change = true;
            this.interactive_profile_img_url_deleted = true;
        },
        getBoothDesigns() {
            this.$store.dispatch("booth-designs/getBoothDesigns")
            .then(res => {
                this.boothDesigns = res.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        getSponsorTypes() {
            this.$store.dispatch("sponsors/getSponsorTypes")
            .then(res => {
                this.sponsorTypes = res.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        getSponsor() {
            this.$store.dispatch("sponsors/getSponsor", this.$route.params.id)
            .then(res => {
                let data = res.data
                let sponsor_data = data.sponsor
                let user_data = sponsor_data.user

                this.form.id = sponsor_data.id
                this.form.name = sponsor_data.name
                this.form.description = sponsor_data.description
                this.form.phone = sponsor_data.phone
                this.form.sponsor_type_id = sponsor_data.type.id
                this.form.logo = sponsor_data.logo
                this.form.interactive_profile = sponsor_data.interactive_profile
                this.form.kuula_iframe = sponsor_data.kuula_iframe
                this.form.booth_design_id = sponsor_data.booth_design_id
                this.form.website = sponsor_data.website
                this.form.slug = sponsor_data.slug

                this.form.email = user_data.email
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
            let properties = Object.keys(this.form)
            let form = createFormData(this.form, properties)
            
            if(this.form.phone == null) {
                form.delete('phone')
                properties.filter(property => property !== 'phone')
            }

            if(this.form.address == null) {
                form.delete('address')
                properties.filter(property => property !== 'address')
            }

            if(this.form.description == null) {
                form.delete('description')
                properties.filter(property => property !== 'description')
            }

            if(this.form.kuula_iframe == null) {
                form.delete('kuula_iframe')
                properties.filter(property => property !== 'kuula_iframe')
            }

            if(this.form.website == null) {
                form.delete('website')
                properties.filter(property => property !== 'website')
            }

            if(this.form.booth_design_id == null) {
                form.delete('booth_design_id')
                properties.filter(property => property !== 'booth_design_id')
            }

            if(this.form.slug == null) {
                form.delete('slug')
                properties.filter(property => property !== 'slug')
            }

            this.$store.dispatch("sponsors/update", form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Sponsors')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getBoothDesigns()
        this.getSponsorTypes()
        this.getSponsor()
    } 
}
</script>