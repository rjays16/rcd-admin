<template>
	<div class="content-header" id="industry-lectures">
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
						:items="industryLectures"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="industryLectureCriteria"
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
								No industry lectures were found.
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
								<a class="btn btn-blue mb-2" :href="`/industry-lectures/edit/${row.item.id}`" title="Edit Industry Lecture">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteIndustryLecture(row.item.id)">
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
				{ key: 'name', label: 'Sponsor Name', tdClass: "align-middle", sortable: true },
				{ key: 'type.name', label: 'Sponsor Type', tdClass: "align-middle", sortable: true },
				{ key: 'lecture', label: 'Lecture', tdClass: "align-middle", sortable: true },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			industryLectureCriteria: '',
            industryLecturesFilterTimeout: null,
			isBusy: true,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            industryLectures: 'industry-lectures/getLectures',
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
            clearTimeout(this.industryLecturesFilterTimeout)
            this.industryLecturesFilterTimeout = setTimeout(() => {
                this.industryLectureCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getLectures() {
			this.$store.dispatch("industry-lectures/getLectures")
			.then(res => {
				this.rows = this.industryLectures.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
		deleteLecture(id) {
            this.$confirm('This will delete the industry lecture. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("industry-lectures/deleteLecture", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getLectures()
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
		this.setNavbarTitle('Industry Lectures')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getLectures()
    } 
}
</script>