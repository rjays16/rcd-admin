<template>
	<div class="content-header" id="booth-designs">
		<div class="container-fluid">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/sponsors/booth-designs/add">
							Add Booth Design
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
						:items="designs"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="designCriteria"
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
								No designs found.
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
								<a class="btn btn-blue mb-2" :href="`/sponsors/booth-designs/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteDesign(row.item.id)">
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
				{ key: 'name', label: 'Name', tdClass: "align-middle" },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			designCriteria: '',
        	designFilterTimeout: null,
			isBusy: true,
		}
	},
	computed: {
		...mapGetters({
            designs: 'booth-designs/getBoothDesigns',
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
            clearTimeout(this.designFilterTimeout)
            this.designFilterTimeout = setTimeout(() => {
                this.designCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getBoothDesigns() {
			this.$store.dispatch("booth-designs/getBoothDesigns")
			.then(res => {
				this.rows = this.designs.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
		deleteDesign(id) {
            this.$confirm('This will delete the booth design. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("booth-designs/delete", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getBoothDesigns()
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
		this.setNavbarTitle('')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getBoothDesigns()
    } 
}
</script>