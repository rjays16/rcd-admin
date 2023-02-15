<template>
	<div class="content-header" id="brochures">
		<div class="container-fluid mt-2">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" :href="`/sponsors/edit/${$route.params.id}/brochures/add`">
							Add Brochure
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
						:items="brochures"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="brochureCriteria"
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
								No brochures found.
							</div>
						</template>
                        <template v-slot:cell(url)="row">
                            <a :href="row.item.url" :download="row.item.url" target="_blank">{{ row.item.url }}</a>
						</template>
                        <template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/sponsors/edit/${$route.params.id}/brochures/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteBrochure(row.item.id)">
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
import { mapGetters } from "vuex"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,
            brochures: [],
			
			fields: [
				{ key: 'url', label: 'File URL', tdClass: "align-middle" },
				{ key: 'position_number', label: 'Position Number', tdClass: "align-middle" },
                { key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			brochureCriteria: '',
            brochureFilterTimeout: null,
			isBusy: true,
		}
	},
    computed: {
        ...mapGetters({
            user: 'auth/user',
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
            clearTimeout(this.brochureFilterTimeout)
            this.brochureFilterTimeout = setTimeout(() => {
                this.brochureCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getBrochures() {
			this.$store.dispatch("sponsor_assets/brochures/getBrochures", this.$route.params.id)
			.then(res => {
                this.brochures = res.data
				this.rows = this.brochures.length
				this.isBusy = false
			})
			.catch(err => {
                this.brochures = []
				this.rows = 0
				this.$message.error(err)
				this.isBusy = false
			})
		},
        deleteBrochure(id) {
            this.$confirm('This will delete the brochure. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
                let data = {
                    sponsor_id: this.$route.params.id,
                    id: id
                }

				this.$store.dispatch("sponsor_assets/brochures/delete", data)
				.then((res) => {
					this.$message.success(res.data.message)
					this.isBusy = true
					setTimeout(() => {
						this.getBrochures()
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
		this.setNavbarTitle('Brochures')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		setTimeout(() => {
            this.getBrochures()
        }, 1000);
    } 
}
</script>