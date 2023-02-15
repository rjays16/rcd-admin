<template>
	<div class="content-header" id="edit-booth-design">
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
                                <label>Photo</label>
                                <div class="image-upload regular">
                                    <img v-if="img_url || form.photo" :src="img_url || form.photo" class="avatar" />
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
                                            <span v-if="form.photo">{{ form.photo.name }}</span>
                                            <span v-else>No file chosen</span>
                                        </div>
                                    </el-upload>

                                    <div v-if="form.photo" class="text-left mt-3">
                                        <button class="btn btn-red" @click="deleteImage()">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="$v.form.photo.$dirty">
                                <div class="note color-FF2C2C" v-if="!$v.form.photo.required">Required Field</div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/sponsors/booth-designs">
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
                photo: null
            },

            img_url: "",
            img_url_change: false,
            img_url_deleted: false,
            
            image_types: ["image/png", "image/jpg", "image/jpeg"],
            file_max: 10000000,
		}
	},
    validations: {
        form: {
            name: {
                required,
                maxLength: maxLength(255)
            },
            photo: {
                required
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
                    this.form.photo = file.raw;
                    this.img_url = URL.createObjectURL(file.raw);
                    this.img_url_change = true;
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
        deleteImage() {
            this.form.photo = null;
            this.img_url = null;
            this.img_url_change = true;
            this.img_url_deleted = true;
        },
        getBoothDesign() {
            this.$store.dispatch("booth-designs/getBoothDesign", this.$route.params.id)
            .then(res => {
                this.form = res.data
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

            this.$store.dispatch("booth-designs/update", form)
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
		this.setNavbarTitle('Booth Design')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getBoothDesign()
    } 
}
</script>