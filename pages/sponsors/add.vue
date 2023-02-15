<template>
	<div class="content-header" id="add-sponsor">
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
                                <label>Address</label>
                                <el-input type="textarea" :rows="4" v-model="$v.form.address.$model" />
                                <div v-if="$v.form.address.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.address.maxLength">Max of {{ $v.form.address.$params.maxLength.max }} characters.</div>
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
                                <label>Banner</label>
                                <div class="image-upload regular">
                                    <img v-if="main_banner_img_url || form.main_banner" :src="main_banner_img_url || form.main_banner" class="avatar w-100" />
                                    <i v-else class="far fa-image"></i>                                        
                                    <el-upload
                                        class="avatar-uploader"
                                        action="/"
                                        accept="image/png, image/jpeg, image/jpg"
                                        :auto-upload="false"
                                        :show-file-list="false"
                                        :on-change="onChangeMainBanner">
                                        <div class="choose-blue-bar text-left py-2 px-3">
                                            <button class="btn btn-white regular">
                                                Choose File
                                            </button>
                                            <span v-if="form.main_banner">{{ form.main_banner.name }}</span>
                                            <span v-else>No file chosen</span>
                                        </div>
                                    </el-upload>

                                    <div v-if="form.main_banner" class="text-left mt-3">
                                        <button class="btn btn-red" @click="deleteMainBanner()">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Kuula Background</label>
                                <el-input type="textarea" v-model="form.background" :rows="8" />
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
                address: null,
                description: null,
                type: null,
                logo: null,
                main_banner: null,
                background: null,
                facebook_url: null,
                website: null,
                slug: null,
            },

            sponsorTypes: [],

            logo_img_url: "",
            logo_img_url_change: false,
            logo_img_url_deleted: false,

            main_banner_img_url: "",
            main_banner_img_url_change: false,
            main_banner_img_url_deleted: false,
            
            image_types: ["image/png", "image/jpg", "image/jpeg"],
            file_max: 10000000,
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
                    this.form.main_banner = file.raw;
                    this.main_banner_img_url = URL.createObjectURL(file.raw);
                    this.main_banner_url_change = true;
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
            this.main_banner_img_url = null;
            this.main_banner_img_url_change = true;
            this.main_banner_img_url_deleted = true;
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

            if(this.form.background == null) {
                form.delete('background')
                properties.filter(property => property !== 'background')
            }

            if(this.form.facebook_url == null) {
                form.delete('facebook_url')
                properties.filter(property => property !== 'facebook_url')
            }

            if(this.form.website == null) {
                form.delete('website')
                properties.filter(property => property !== 'website')
            }

            if(this.form.slug == null) {
                form.delete('slug')
                properties.filter(property => property !== 'slug')
            }

            this.$store.dispatch("sponsors/create", form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/sponsors')
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
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')

        this.getSponsorTypes()
    } 
}
</script>