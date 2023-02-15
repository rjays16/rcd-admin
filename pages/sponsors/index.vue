<template>
	<div class="content-header" id="sponsors">
		<div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/sponsors/add">
							Add Sponsor
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-4">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="search" suffix-icon="el-icon-search" clearable />
                    </div>
                </div>
				<div class="row">
					<b-table
						hover 
						:items="sponsors"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="sponsorCriteria"
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
								No sponsors found.
							</div>
						</template>
						<template v-slot:cell(email)="row">
                            <a class="link-label" :href="'mailto: ' + row.item.user.email">{{ row.item.user.email }}</a>
                        </template>
						<template v-slot:cell(phone)="row">
                            <a class="link-label" :href="'tel: ' + row.item.user.phone  ">{{ row.item.user.phone }}</a>
                        </template>
						<template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/sponsors/edit/${row.item.id}`" title="Edit Sponsor">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-orange mb-2" :href="`/sponsors/edit/${row.item.id}/videos`" title="Videos">
									<i class="fa fa-file-video"></i>
								</a>
								<a class="btn btn-green mb-2" :href="`/sponsors/edit/${row.item.id}/brochures`" title="Brochures">
									<i class="fas fa-book-open"></i>
								</a>
								<a class="btn btn-red mb-2" :href="`/sponsors/edit/${row.item.id}/product-catalogue`" title="Product Catalogue">
									<i class="fas fa-newspaper"></i>
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
import { mapGetters } from "vuex"
import { disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,
			
			fields: [
				{ key: 'name', label: 'Name', tdClass: "align-middle", sortable: true },
				{ key: 'type.name', label: 'Sponsor Type', tdClass: "align-middle", sortable: true },
				{ key: 'email', label: 'Email', tdClass: "align-middle color-0088CC", sortable: true },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			sponsorCriteria: '',
            sponsorFilterTimeout: null,
			isBusy: true,
		}
	},
	computed: {
		...mapGetters({
            sponsors: 'sponsors/getSponsors',
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
            clearTimeout(this.sponsorFilterTimeout)
            this.sponsorFilterTimeout = setTimeout(() => {
                this.sponsorCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getSponsors() {
			this.$store.dispatch("sponsors/getSponsors")
			.then(res => {
				this.rows = this.sponsors.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
        approveSponsor(id) {
			disableButton('.btn-approve-sponsor-' + id, true)
			this.$store.dispatch("sponsors/approve", id)
			.then((res) => {
				this.$message.success(res.data.message)
				this.getSponsors()
			})
			.catch((err) => {
				this.$message.error(err)
				disableButton('.btn-approve-sponsor-' + id, false)
			})
        },
		deleteSponsor(id) {
            this.$confirm('This will delete the sponsor. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("sponsors/delete", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getSponsors()
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
	},
    mounted() {
		this.setNavbarTitle('Sponsors')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getSponsors()
    } 
}
</script>