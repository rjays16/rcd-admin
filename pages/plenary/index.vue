<template>
	<div class="content-header" id="plenary">
		<div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/plenary/add">
							Add Plenary Event
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
						:items="plenaries"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="plenaryCriteria"
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
								No plenary events found.
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
								<a class="btn btn-blue mb-2" :href="`/plenary/edit/${row.item.id}`" title="Edit Plenary">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deletePlenaryEvent(row.item.id)">
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
				{ key: 'date', label: 'Date', tdClass: "align-middle", sortable: true },
				{ key: 'title', label: 'Title', tdClass: "align-middle", sortable: true },
				{ key: 'speaker_description', label: 'Speaker Description', tdClass: "align-middle", sortable: true },
				{ key: 'starts_at', label: 'Starts At', tdClass: "align-middle", sortable: true },
				{ key: 'ends_at', label: 'Ends At', tdClass: "align-middle", sortable: true },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			plenaryCriteria: '',
            plenaryFilterTimeout: null,
			isBusy: true,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            plenaries: 'plenaries/getPlenaryEvents',
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
            clearTimeout(this.plenaryFilterTimeout)
            this.plenaryFilterTimeout = setTimeout(() => {
                this.plenaryCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getPlenaryEvents() {
			this.$store.dispatch("plenaries/getPlenaryEvents")
			.then(res => {
				this.rows = this.plenaries.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
		deletePlenaryEvent(id) {
            this.$confirm('This will delete the plenary event. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("plenaries/delete", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getPlenaryEvents()
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
		this.setNavbarTitle('Plenary')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getPlenaryEvents()
    } 
}
</script>