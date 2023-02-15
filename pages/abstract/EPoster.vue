<template>
  	<section>
		<div class="content-header" id="abstract">
			<div class="container-fluid">
				<div class="container-fluid py-2">
					<div class="row">
						<div class="col-12 pl-0">
							<a class="btn btn-blue border" data-target="#addEPoster" data-toggle="modal">
								Add E-Poster Submission
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="container-fluid">
				<div class="container-fluid mt-2 bg-white corner-rounded p-3">
					<div class="row filters my-3">
						<div class="col-lg-4 col-md-12 mb-2">
							<el-input v-model="searchTerm" placeholder="Search..." @input="search" @clear="getAbstract(null)" suffix-icon="el-icon-search" clearable />
						</div>
					</div>
					<div class="row">
						<b-table
							hover
							:items="abstracts"
							:fields="fields"
							:per-page="perPage"
							:current-page="currentPage"
							:responsive="true"
							:filter-included-fields="['authors', 'member.user.email', 'title']"
							:busy="isBusy"
							class="m-2"
							:filter="searchCriteria"
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
									No E-Poster Abstracts were found.
								</div>
							</template>
							<template v-slot:cell(authors)="row">
								<ul class="no-bullets">
									<li v-for="author in row.item.authors" :key="author.id">
										<span>{{ author.first_name + " " + author.last_name }}</span>
									</li>
								</ul>
							</template>
							<template v-slot:cell(action)="row">
								<button class="btn btn-blue py-2 corner-22px opensans w-50 corner-pill mb-2" @click="openAbstractModal(row.item.id)">View</button>
								<button v-if="adminCapability.can_delete_abstract" class="btn btn-yellow py-2 corner-22px opensans w-50 corner-pill mb-2" @click="openAbstractEdit(row.item.id)">Edit</button>
								<button v-if="adminCapability.can_delete_abstract"
									class="btn btn-red py-2 corner-22px opensans w-50 corner-pill mb-2" :class='"btn-delete-abstract-" + row.item.id'
									@click="deleteAbstract(row.item.id)">
									Delete
								</button>
								<button v-if="!adminCapability.can_resend_abstract_ty_mail"
									class="btn btn-green py-2 corner-22px opensans w-50 corner-pill" :class='"btn-resend-email-" + row.item.id'
									@click="resendThankYouEmail(row.item.id)">
									Resend Email Receipt
								</button>
							</template>
							<template v-slot:cell(created_at)="row">
								{{ new Date(row.item.created_at) | moment("MMMM D, YYYY") }}
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
			<ModalAbstractPreview ref="AbstractPreviewModal"/>
			<ModalAbstractEdit ref="AbstractPreviewEdit"/>
      		<ModalAbstractAddEposter ref="AddEPoster"/>
		</div>
  	</section>
</template>

<script>
import { mapGetters } from "vuex";
import { disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			is_preview: false,
			abstracts: [],
			searchTerm: null,
			fields: [
				{ key: 'id', label: 'Abstract ID #', thClass: "text-center", tdClass: "align-middle text-center", sortable: true },
        		{ key: 'title', label: 'Title', thClass: "text-center", tdClass: "align-middle text-center", sortable: true},
				{ key: 'authors', label: 'Submitting Author', thClass: "text-center", tdClass: "align-middle text-center" },
				{ key: 'member.user.email', label: 'Email', thClass: "text-center", tdClass: "align-middle text-center" },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle text-center"},
				{ key: 'created_at', label: 'Date Submitted', thClass: "text-center", tdClass: "align-middle text-center", sortable: true },
			],

			rows: 0,
			currentPage: 1,
			perPage: 10,
			searchCriteria: '',
			searchFilterTimeout: null,
			isBusy: true,
		}
	},
	computed: {
        ...mapGetters({
            adminCapability: 'auth/adminCapability',
            // author_search: 'abstract/searchAbstract'
        }),
    },
	methods: {
    getEposters() {
      	this.$store.dispatch("abstract/getAllEposterAbstracts")
        .then(res => {
			this.abstracts = res.data
			this.rows = this.abstracts.length
			this.isBusy = false
        })
        .catch(err => {
			console.error(err)
			this.isBusy = false
        })
    },
    setNavbarTitle(title) {
      	this.$store.commit('SET_NAVBAR_TITLE', title)
    },
    setNavbarIcon(icon) {
      	this.$store.commit('SET_NAVBAR_ICON', icon)
    },
    setNavbarSubpageTitle(subtitle) {
      	this.$store.commit('SET_NAVBAR_SUBPAGE_TITLE', subtitle)
    },
    onFiltered(filtered_items) {
      	this.rows = filtered_items.length
      	this.currentPage = 1
    },
    openAbstractModal(abstract_id) {
      	this.$refs.AbstractPreviewModal.openModal(abstract_id, true);
    },
    openAbstractEdit(abstract_id) {
      this.$refs.AbstractPreviewEdit.editModal(abstract_id, true);
    },
    deleteAbstract(id) {
		this.$confirm('This will delete the abstract. Continue?', 'Warning', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
			type: 'warning'
		}).then(() => {
			disableButton('.btn-delete-abstract-' + id, true)
			this.$store.dispatch("abstract/delete", id)
			.then((res) => {
				this.$message.success(res.data.message)
				this.getEposters()
				disableButton('.btn-delete-abstract-' + id, false)
			})
			.catch((err) => {
				this.$message.error(err)
				disableButton('.btn-delete-abstract-' + id, false)
			})
		}).catch(() => {
			this.$message({
				type: 'info',
				message: 'Delete Cancelled'
			});
		});
    },
    search() {
		this.isBusy = true
		clearTimeout(this.searchFilterTimeout)
		this.searchFilterTimeout = setTimeout(() => {
			this.searchCriteria = this.searchTerm
			this.isBusy = false
		}, 300)
    },
    resendThankYouEmail(abstract_id) {
    	this.$confirm('This will resend the thank you email to the member. Continue?', 'Warning', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
			type: 'warning'
			}).then(() => {
				disableButton('.btn-resend-email-' + abstract_id, true)
				this.$store.dispatch("abstract/resendThankYouEmail", abstract_id)
				.then((res) => {
					this.$message.success(res.data.message)
					disableButton('.btn-resend-email-' + abstract_id, false)
				})
				.catch((err) => {
					this.$message.error(err)
					disableButton('.btn-resend-email-' + abstract_id, false)
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Cancelled'
				});
			});
		},
	},
	mounted() {
		this.setNavbarTitle('E-Poster Presentation')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')
		this.getEposters()
	}
}
</script>
<style>
.btn-yellow {
  background-color: #FFDA29;
}
.fa-plus{
  width: 30%;
}
.col-lg-8 .btn-green{
  width: 15%;
}
</style>
