<template>
	<div class="content-header" id="videos">
        <div class="container-fluid mt-2">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-12 pl-0">
                        <a class="btn btn-blue border" :href="`/sponsors/edit/${$route.params.id}/videos/add`">
                            Add Video
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="mt-2 bg-white corner-rounded p-3">
                <div class="row filters my-3">
                    <div class="col-4">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="search" suffix-icon="el-icon-search" clearable />
                    </div>
                </div>
                <div class="row">
                    <b-table
                        hover 
                        :items="form.video_list"
                        :fields="fields"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :filter="videoCriteria"
                        :responsive="true"
                        :busy="isBusy"
                        class="m-2"
                        :show-empty="rows == 0"
                        @filtered="onFiltered">
                        <template slot="table-busy">
                            <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                        <template #empty>
                            <div class="text-center">
                                No videos found.
                            </div>
                        </template>
                        <template v-slot:cell(url)="row">
                            <a :href="row.item.url" :download="row.item.url" target="_blank">{{ row.item.url }}</a>
                        </template>
                        <template v-slot:cell(action)="row">
                            <div class="actions same-size text-center">
                                <a class="btn btn-blue mb-2" :href="`/sponsors/edit/${$route.params.id}/videos/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
                                <a class="btn btn-red mb-2" @click="deleteVideo(row.item.id)">
                                    <i class="fas fa-times"></i>
                                </a>
                            </div>
                        </template>
                    </b-table>
                    <div class="w-100 m-2" v-if="rows > 0">  
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            class="float-right green-pagination"
                            prev-text="Previous"
                            next-text="Next"
                            first-number
                            last-number
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from 'vuelidate/lib/validators'
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                videos: [],
                video_list: [],
            },

            searchTerm: null,
			
			fields: [
				{ key: 'url', label: 'File URL', tdClass: "align-middle" },
                { key: 'position_number', label: 'Position Number', tdClass: "align-middle" },
                { key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],

            rows: 0,
			currentPage: 1,
			perPage: 10,
			videoCriteria: '',
            videoFilterTimeout: null,
			isBusy: true,
            
            video_types: [
                "video/x-flv", "video/mp4", "application/x-mpegURL", "video/MP2T", "video/3gpp",
                "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/avi"
            ],
            video_types_string: "video/x-flv, video/mp4, application/x-mpegURL, video/MP2T, video/3gpp, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/avi",
            
            file_max: 10000000,
            video_url: "",
            video_url_change: false,
		}
	},
    computed: {
        ...mapGetters({
            user: 'auth/user',
        }),
    },
    validations: {
        form: {
            videos: {
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
        search() {
            this.isBusy = true
            clearTimeout(this.videoFilterTimeout)
            this.videoFilterTimeout = setTimeout(() => {
                this.videoCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
        onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
        beforeUpload(file) {
            console.log(file.type)
            const valid = this.video_types.includes(file.type)
            if(!valid) {
                this.$message.error('File must be a video.');
            } else {
                this.form.videos.push(file);
            }

            return valid;
        },
        handleRemove(file, fileList) {
            this.form.videos = fileList
        },
        handleExceed(file, fileList) {
            this.$message.error("Maximum of 1 files only")
        },
        getVideos() {
            this.$store.dispatch("sponsor_assets/videos/getVideos", this.$route.params.id)
            .then(res => {
                this.form.videos.push(res.data)
                this.form.video_list = res.data
                this.isBusy = false
            })
            .catch(err => {
                this.isBusy = false
                this.form.videos = []
                this.form.video_list = []
                this.rows = 0
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
            let properties = Object.keys(this.form)
            let form = createFormData(this.form, properties)

            form.append("id", this.$route.params.id)

            if(this.form.videos !== null) {
                this.form.videos.map(video => {
                    form.append("videos[]", video)
                })
            }

            this.$store.dispatch("sponsor_assets/videos/uploadVideo", form)
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
        },
        deleteVideo(id) {
            this.$confirm('This will delete the video. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
                let data = {
                    sponsor_id: this.$route.params.id,
                    id: id
                }

				this.$store.dispatch("sponsor_assets/videos/delete", data)
				.then((res) => {
					this.$message.success(res.data.message)
                    this.isBusy = true
					setTimeout(() => {
						this.getVideos()
					}, 3000);
				})
				.catch((err) => {
					this.$message.error(err)
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Delete Cancelled'
				});
			});
        }
	},
    async fetch() {
		this.setNavbarTitle('Videos')
        this.setNavbarSubpageTitle('')
        this.setNavbarIcon('')

        setTimeout(() => {
            this.getVideos()
        }, 1000);
    } 
}
</script>

<style lang="scss" scoped>
#videos {
    ::v-deep .el-upload {
        text-align: left;
        width: auto;
    }
}
</style>