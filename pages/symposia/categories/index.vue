<template>
	<div class="content-header" id="symposia-categories">
		<div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/symposia/categories/add">
							Add Symposia Category
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
						:items="symposiaCategories"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="symposiaCategoryCriteria"
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
								No symposia categories were found.
							</div>
						</template>
						<template v-slot:head(action)>
							{{ user_role == super_admin_type ? "Actions" : "" }}
						</template>
						<template v-slot:cell(date)="row">
                            {{ new Date(row.item.date) | moment("MMMM D, YYYY") }}
                        </template>
						<template v-slot:cell(action)="row" v-if="user_role == super_admin_type">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/symposia/categories/edit/${row.item.id}`" title="Edit Symposia Category">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteSymposiaCategory(row.item.id)">
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
			
			fields: [
				{ key: 'chair', label: 'Chair', tdClass: "align-middle", sortable: true },
				{ key: 'title', label: 'Title', tdClass: "align-middle", sortable: true },
				{ key: 'subtitle', label: 'Subtitle', tdClass: "align-middle", sortable: true },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			symposiaCategoryCriteria: '',
            symposiaCategoryFilterTimeout: null,
			isBusy: true,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            symposiaCategories: 'symposia/getCategories',
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
            clearTimeout(this.symposiaCategoryFilterTimeout)
            this.symposiaCategoryFilterTimeout = setTimeout(() => {
                this.symposiaCategoryCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getSymposiaCategories() {
			this.$store.dispatch("symposia/getCategories")
			.then(res => {
				this.rows = this.symposiaCategories.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
		deleteSymposiaCategory(id) {
            this.$confirm('This will delete the symposia category. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("symposia/deleteCategory", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getSymposiaCategories()
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
		this.setNavbarTitle('Symposia Categories')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getSymposiaCategories()
    } 
}
</script>