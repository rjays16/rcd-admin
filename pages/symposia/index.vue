<template>
	<div class="content-header" id="symposia">
		<div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/symposia/add">
							Add Symposia
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-4">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="searchEvents" @clear="getEvents(null)" suffix-icon="el-icon-search" clearable />
                    </div>
					<div class="col-lg-8 col-md-12 mb-2 text-right">
						<button class="btn btn-blue btn-get-all py-2" @click="getEvents(true)">
							Show All Symposia
						</button>
                    </div>
                </div>
				<div class="row">
					<b-table
						hover 
						:items="symposia"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="symposiaCriteria"
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
								No symposia events were found.
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
								<a class="btn btn-blue mb-2" :href="`/symposia/edit/${row.item.id}`" title="Edit Symposia">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteSymposia(row.item.id)">
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
import { disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,
			
			fields: [
				{ key: 'card_title', label: 'Card Title', tdClass: "align-middle", sortable: true },
				{ key: 'title', label: 'Title', tdClass: "align-middle", sortable: true },
				{ key: 'author', label: 'Author', tdClass: "align-middle", sortable: true },
				{ key: 'category.title', label: 'Category', tdClass: "align-middle", sortable: true },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			symposiaCriteria: '',
            symposiaFilterTimeout: null,
			isBusy: true,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            symposia: 'symposia/getEvents',
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
            clearTimeout(this.symposiaFilterTimeout)
            this.symposiaFilterTimeout = setTimeout(() => {
                this.symposiaCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getEvents(show_all) {
			let data = {
                is_search: null,
                keyword: null,
				show_all: show_all
            }

			this.isBusy = true
			disableButton('.btn-get-all', true)
			this.$store.dispatch("symposia/getEvents", data)
			.then(res => {
				this.rows = this.symposia.length
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
				this.rows = 0
				disableButton('.btn-get-all', false)
			})
		},
		searchEvents() {
			let value = this.searchTerm
            if(value.length >= 4) {
                let data = {
                    is_search: true,
                    keyword: value,
                }

				this.isBusy = true
                this.$store.dispatch("symposia/getEvents", data)
                .then((res) => {
					this.rows = this.symposia.length
					this.isBusy = false
                })
                .catch((err) => {
					this.$message.error(err)
					this.isBusy = false
					this.rows = 0
                })
            } else if(value.length == 0) {
				this.getEvents(null)
			}
        },
		deleteSymposia(id) {
            this.$confirm('This will delete the symposia event. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("symposia/deleteSymposia", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getEvents()
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
		this.setNavbarTitle('Symposia')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getEvents(null)
    } 
}
</script>