<template>
    <section id="ondemand-logs-plenary">
        <div class="content-header" id="attendees">
            <div class="container-fluid mt-2 bg-white corner-rounded p-3">
                <div class="row mb-4">
                    <div class="col-lg-9">
                        <button class="btn btn-blue btn-export text-uppercase" @click="exportData">
                            Export
                        </button>
                    </div>
                    <div class="col-lg-3">
                        <b-input v-model="filter" placeholder="Search...."></b-input>
                    </div>
                </div>
                <div class="row">
                    <b-table
                        hover
                        :fields="attendance_fields"
                        :items="attendance_items"
                        :filter="filter"
                        :busy="isBusy"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :responsive="true"
                        :show-empty="attendance_items.length === 0">
                        <template slot="table-busy">
                        <div class="text-center text-success my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                        </template>
                        <template #empty>
                        <div class="text-center">
                            No logs were found.
                        </div>
                        </template>
                        <template v-slot:cell(Logged_Date)="row">
                            {{ formatDate(row.item.Logged_Date, "MMMM D, YYYY") }}
                        </template>
                    </b-table>
                    <div class="w-100 m-2">
                        <b-pagination
                            class="float-right"
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            prev-text="Previous"
                            next-text="Next"
                            first-number
                            last-number
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import moment from 'moment';
import { disableButton } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            filter: null,
            isBusy: true,
            currentPage: 1,
            perPage: 10,
            attendance_fields:[
                { key: 'Logged_Date', label: 'Date' },
                { key: 'full_name', label: 'Attendee' },
                { key: 'Login_Time', label: 'Time Log In' },
                { key: 'Logout_Time', label: 'Time Log Out' },
                { key: 'Estimated_Time_Duration', label: 'Est. Session Duration' }
            ],
            attendance_items:[],
        }
    },
    computed: {
        rows() {
            return this.attendance_items.length
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
        filterTable(row, filter) {
            if (row.full_name >= filter ) {
                return false;
            } else {
                return true;
            }
        },
        getAttendance() {
            this.$store.dispatch("ondemand-logs/getPlenaryLogs")
            .then(res => {
                this.attendance_items = res.data
                this.isBusy = false
            })
            .catch(err => {
                this.attendance_items = []
                this.isBusy = false
            })
        },
        formatDate(date, format) {
            return moment(date).format(format)
        },
        exportData(){
            disableButton('.btn-export', true)
            this.$store.dispatch("ondemand-logs/exportPlenary")
            .then(res => {
                const url = URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', "ondemand_plenary_logs.xlsx")
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                disableButton('.btn-export', false)
            })
            .catch(err => {
                this.$message.error('Could not export the file. Please contact the site admin.')
                disableButton('.btn-export', false)
            })
        },
    },
    mounted() {
        this.setNavbarTitle('On Demand Logs')
        this.setNavbarSubpageTitle('Plenary')
        this.setNavbarIcon('')
        
        this.getAttendance()
    }
}
</script>