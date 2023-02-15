<template>
	<div class="content-header" id="vips">
		<div class="container-fluid" v-if="user_role == super_admin_type">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-lg-9 col-md-12 pl-0 con-search-options">
						<el-upload
							class="el-auto upload-vips row pl-2"
							action="/"
							:auto-upload="false"
							:accept="file_types_string"
							:show-file-list="false"
							:on-change="onChangeFile"
							:on-exceed="onExceed">
							<el-button class="btn btn-blue py-2 mr-3" slot="trigger">Select File for Free Delegates</el-button>
							<button class="btn btn-green btn-import py-2 mr-3" @click="importFile">Upload</button>
							<el-select v-model="form.vip_type" placeholder="Select Type" class="w-50">
                                <el-option
                                    v-for="option in types"
                                    :key="option.id"
                                    :label="option.name"
                                    :value="option.id" />
                            </el-select>
							<!-- <button class="btn btn-green-inverse btn-dl-template" @click="downloadTemplate">Download Template</button> -->
							<div v-if="form.file">
								<p class="my-2 note">{{ form.file.name }}</p>
								<button class="btn btn-red" @click="deleteFile()">
									Delete
								</button>
							</div>
						</el-upload>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-4 mb-2">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="search" suffix-icon="el-icon-search" clearable />
                    </div>
					<div class="col-lg-8 col-md-12 mb-2 text-right">
						<button class="btn btn-blue btn-get-all py-2" @click="getVIPs(true)">
							Show All VIP
						</button>
                    </div>
                </div>
				<div class="row">
					<b-table
						hover
						:items="vips"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="vipCriteria"
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
								No vips found.
							</div>
						</template>
						<template v-slot:cell(email)="row">
                            <a class="link-label" :href="'mailto: ' + row.item.user.email">{{ row.item.user.email }}</a>
                        </template>
						<template v-slot:cell(registration_type)="row">
							{{ row.item.registration_type.name }}
                        </template>
						<template v-slot:cell(registration_sub_type)="row">
							{{ row.item.registration_sub_type ? row.item.registration_sub_type.name : "" }}
                        </template>
						<template v-slot:cell(status)="row">
							{{ row.item.status == 2 ? "REGISTERED": "PRE-UPLOADED" }}
                        </template>
            <template v-slot:cell(can_generate_certificate)="row">
              <button class="btn" :class="row.item.user.member.can_generate_certificate ? 'btn-green' : 'btn-orange'"
                      @click="changeValue(!row.item.user.member.can_generate_certificate, row.item.user.member.id, 'can_generate_certificate')">
                {{ row.item.user.member.can_generate_certificate ? "YES" : "NO" }}
              </button>
            </template>
						<template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/vips/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteVIP(row.item.id)">
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

		<!-- <ModalMemberOrders ref="memberOrdersModal" /> -->
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,

			fields: [
				{ key: 'user.full_name', label: 'Name', tdClass: "align-middle", sortable: true },
				{ key: 'email', label: 'Email', tdClass: "align-middle", sortable: true },
				{ key: 'registration_type', label: 'Member Type', tdClass: "align-middle", sortable: true },
				{ key: 'registration_sub_type', label: 'Registrant Type', tdClass: "align-middle", sortable: true },
				{ key: 'status', label: 'Status', thClass: "text-center", tdClass: "align-middle" },
        { key: 'can_generate_certificate', label: 'Can generate certificate?', thClass: "text-center", tdClass: "align-middle" },
        { key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" }
			],

			rows: 0,
			currentPage: 1,
			perPage: 10,
			vipCriteria: '',
            vipFilterTimeout: null,
			isBusy: true,

			form: {
				file: null,
				vip_type: null
			},

			file_url: null,
			file_url_change: false,
			file_url_deleted: false,
			file_types_string: `.csv, .xls, .xlsx, application/csv, application/x-csv,
				application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel`,
			file_types: [
				".csv", ".xls", ".xlsx", "application/csv", "application/x-csv",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"
			],
			file_max: 10000000,

			types: this.$store.state.vips.types,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            vips: 'vips/getVIPs',
			adminCapability: 'auth/adminCapability',
        }),
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
            clearTimeout(this.vipFilterTimeout)
            this.vipFilterTimeout = setTimeout(() => {
                this.vipCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
    changeValue(value, id, field) {
      let data = {
        id: id,
        value: value,
        field: field
      }

      this.$store.dispatch("members/updateField", data)
        .then(res => {
          this.$message.success(res.data.message)
          this.getDelegates(null)
        })
        .catch(err => {
          this.$message.error(err)
        })
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getVIPs(show_all) {
			let data = {
                is_search: null,
                keyword: null,
				show_all: show_all,
            }

			this.isBusy = true
			disableButton('.btn-get-all', true)
			this.$store.dispatch("vips/getVIPs", data)
			.then(res => {
				this.rows = this.vips.length
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
		},
		searchVIPs() {
			let value = this.searchTerm
            if(value.length >= 4) {
                let data = {
                    is_search: true,
                    keyword: value,
                }

				this.isBusy = true
                this.$store.dispatch("vips/getVIPs", data)
                .then((res) => {
					this.rows = this.vips.length
					this.isBusy = false
                })
                .catch((err) => {
					this.$message.error(err)
					this.isBusy = false
                })
            } else if(value.length == 0) {
				this.getVIPs(null)
			}
        },
		deleteVIP(id) {
            this.$confirm('This will delete the VIP. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("vips/delete", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getVIPs()
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
		},
		onExceed() {
			this.$message.info('Select one file only per upload.')
		},
		onChangeFile(file) {
            this.validateFile(file.raw, "photo", (result) => {
                if (result == true) {
                    this.form.file = file.raw;
                    this.prod_img_url = URL.createObjectURL(file.raw);
                    this.prod_img_url_change = true;
                }
            });
        },
        validateFile(file, type, callback) {
            let valid_types = this.file_types;
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
		deleteFile() {
			this.form.file = null;
			this.file_url = null;
			this.file_url_change = true;
			this.file_url_deleted = true;
		},
		importFile() {
			if(!this.form.file) {
				this.$message.error('Please select a file for upload.')
			} else {
				disableButton('.btn-import', true)
				let properties = Object.keys(this.form)
				let form = createFormData(this.form, properties)

				this.$store.dispatch("vips/import", form)
				.then(res => {
					this.$message.success(res.data.message)
					this.getVIPs()
					this.deleteFile()
					disableButton('.btn-import', false)
				})
				.catch(err => {
					this.$message.error('Something went wrong. Please contact the site admin.')
					disableButton('.btn-import', false)
				})
			}
		},
		downloadTemplate() {
			disableButton('.btn-dl-template', true)
			this.$store.dispatch("vips/exportTemplate")
			.then(res => {
				const url = URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', "vip_template.xlsx")
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
				disableButton('.btn-dl-template', false)
			})
			.catch(err => {
				this.$message.error('Could not export the template. Please contact the site admin.')
				disableButton('.btn-dl-template', false)
			})
		},
		showOrders(delegate, member_name) {
			if(delegate.user.member == null) {
				this.$message.error("Unable to retrieve the member data. Please contact the site admin.")
			} else {
				this.$refs.memberOrdersModal.openModal(delegate.user.member.id, member_name)
			}
		},
	},
    mounted() {
		this.setNavbarTitle('VIP')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getVIPs()
    }
}
</script>
