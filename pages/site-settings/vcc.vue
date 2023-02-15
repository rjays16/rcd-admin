<template>
	<div class="content-header" id="vcc">
		<div class="container-fluid mb-5">
			<div class="container-fluid mt-2 main">
				<div class="row justify-content-center mb-5">
					<div class="col-lg-8 col-md-12">
						<div class="bg-white corner-rounded p-3">
							<div class="mb-3">
								<div class="col-12 form-group">
									<label>Virtual Convention Start Date</label>
									<div>
										<el-date-picker v-model="$v.form.value.$model" value-format="yyyy-MM-dd" placeholder="Start Date" />
										<div v-if="$v.form.value.$dirty">
											<div class="note color-FF2C2C" v-if="!$v.form.value.required">Required Field</div>
										</div>
									</div>
								</div>
							</div>

							<div class="text-right mt-4">
								<button class="btn btn-green btn-save" @click="recheckInputs">
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 main">
				<div class="row justify-content-center mb-5">
					<div class="col-lg-8 col-md-12">
						<div class="bg-white corner-rounded p-3">
							<div class="mb-3">
								<div class="col-12 form-group">
									<label>Convention Workshop Dates:</label>
									<div>
										<table class=" table table-borderless">
											<tr>
												<td colspan="2"><label>Workshop Laser:</label></td>
											</tr>
											<tr>
												<td class="avenir-regular">Start Date:</td>
												<td class="avenir-regular">End Date:</td>
												<td></td>
											</tr>
											<tr>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_laser_start_date.$model" value-format="yyyy-MM-dd" placeholder="Start Date" />
														<div v-if="$v.workshop_form.workshop_laser_start_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_laser_start_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_laser_end_date.$model" value-format="yyyy-MM-dd" placeholder="End Date" />
														<div v-if="$v.workshop_form.workshop_laser_end_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_laser_end_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<button class="btn btn-green btn-save" @click="saveWorkshopDate_Laser">
														Save
													</button>
												</td>
											</tr>
											<tr>
												<td colspan="2"><label>Workshop Aesthetic:</label></td>
											</tr>
											<tr>
												<td class="avenir-regular">Start Date:</td>
												<td class="avenir-regular">End Date:</td>
												<td></td>
											</tr>
											<tr>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_aesthetic_start_date.$model" value-format="yyyy-MM-dd" placeholder="Start Date" />
														<div v-if="$v.workshop_form.workshop_aesthetic_start_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_aesthetic_start_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_aesthetic_end_date.$model" value-format="yyyy-MM-dd" placeholder="End Date" />
														<div v-if="$v.workshop_form.workshop_aesthetic_end_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_aesthetic_end_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<button class="btn btn-green btn-save" @click="saveWorkshopDate_Aesthetic">
														Save
													</button>
												</td>
											</tr>
											<tr>
												<td colspan="2"><label>Both Aesthetic and Laser:</label></td>
											</tr>
											<tr>
												<td class="avenir-regular">Start Date:</td>
												<td class="avenir-regular">End Date:</td>
												<td></td>
											</tr>
											<tr>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_both_aesthetic_laser_start_date.$model" value-format="yyyy-MM-dd" placeholder="Start Date" />
														<div v-if="$v.workshop_form.workshop_both_aesthetic_laser_start_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_both_aesthetic_laser_start_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<div>
														<el-date-picker v-model="$v.workshop_form.workshop_both_aesthetic_laser_end_date.$model" value-format="yyyy-MM-dd" placeholder="End Date" />
														<div v-if="$v.workshop_form.workshop_both_aesthetic_laser_end_date.$dirty">
															<div class="note color-FF2C2C" v-if="!$v.workshop_form.workshop_both_aesthetic_laser_end_date.required">Required Field</div>
														</div>
													</div>
												</td>
												<td>
													<button class="btn btn-green btn-save" @click="saveWorkshopDate_Both">
														Save
													</button>
												</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			form: {
				value: null,
			},
			workshop_form: {
				workshop_laser_id: null,
				workshop_aesthetic_id: null,
				workshop_both_aesthetic_laser_id: null,
				workshop_laser_start_date: null,
				workshop_aesthetic_start_date: null,
				workshop_both_aesthetic_laser_start_date: null,
				workshop_laser_end_date: null,
				workshop_aesthetic_end_date: null,
				workshop_both_aesthetic_laser_end_date: null,
			},
			availableDateOptions: {
				disabledDate (date) {
					var yesterday = new Date();
					yesterday.setDate(yesterday.getDate()-1);
					return date < yesterday
				}
			},
		}
	},
	validations: {
        form: {
			value: {
				required
			},
        },
        workshop_form: {
			workshop_laser_start_date: {
				required
			},
			workshop_aesthetic_start_date: {
				required
			},
			workshop_both_aesthetic_laser_start_date: {
				required
			},
			workshop_laser_end_date: {
				required
			},
			workshop_aesthetic_end_date: {
				required
			},
			workshop_both_aesthetic_laser_end_date: {
				required
			},
		},
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
		getOpeningDate() {
			this.$store.dispatch("settings/vcc/getOpeningDate")
			.then((res) => {
				this.form.value = res.data.opening_date
			})
			.catch((err) => {
				this.$message.error(err.response.data.message)
			})
		},
		getOpeningWorkshop() {
			this.$store.dispatch("settings/workshop/getOpeningDateWorkshop")
			.then((res) => {
				this.workshop_form.workshop_laser_id = res.data[0].id;
				this.workshop_form.workshop_aesthetic_id = res.data[1].id;
				this.workshop_form.workshop_both_aesthetic_laser_id = res.data[2].id;
				this.workshop_form.workshop_laser_start_date = res.data[0].workshop_sdate;
				this.workshop_form.workshop_aesthetic_start_date = res.data[1].workshop_sdate;
				this.workshop_form.workshop_both_aesthetic_laser_start_date = res.data[2].workshop_sdate;
				this.workshop_form.workshop_laser_end_date = res.data[0].workshop_edate;
				this.workshop_form.workshop_aesthetic_end_date = res.data[1].workshop_edate;
				this.workshop_form.workshop_both_aesthetic_laser_end_date = res.data[2].workshop_edate;
				console.log(this.workshop_form.workshop_laser_id)
			})
			.catch((err) => {
				this.$message.error(err.response.data.message)
			})
		},
		recheckInputs() {
			this.$v.$touch()
			if(this.$v.$invalid) {
				this.$message.error("Please fill in the required fields.")
			} else {
				this.save()
			}
		},
		saveWorkshopDate_Laser() {
			this.$v.$touch()
			if(this.$v.$invalid) {
				this.$message.error("Please fill in the required fields.")
			} else {
				disableButton('.btn-save', true)
				this.$store.dispatch("settings/workshop/update", {
					id: this.workshop_form.workshop_laser_id,
					workshop_sdate: this.workshop_form.workshop_laser_start_date,
					workshop_edate: this.workshop_form.workshop_laser_end_date,
				})
				.then(res => {
					this.$message.success("Successfully Save Workshop Laser Dates")
					disableButton('.btn-save', false)
				})
				.catch(err => {
					this.$message.error('Please fill in the required fields.')
					disableButton('.btn-save', false)
				})
			}
		},
		saveWorkshopDate_Aesthetic() {
			this.$v.$touch()
			if(this.$v.$invalid) {
				this.$message.error("Please fill in the required fields.")
			} else {
				disableButton('.btn-save', true)
				this.$store.dispatch("settings/workshop/update", {
					id: this.workshop_form.workshop_aesthetic_id,
					workshop_sdate: this.workshop_form.workshop_aesthetic_start_date,
					workshop_edate: this.workshop_form.workshop_aesthetic_end_date,
				})
				.then(res => {
					this.$message.success("Successfully Save Workshop Aesthetic Dates")
					disableButton('.btn-save', false)
				})
				.catch(err => {
					this.$message.error('Please fill in the required fields.')
					disableButton('.btn-save', false)
				})
			}
		},
		saveWorkshopDate_Both() {
			this.$v.$touch()
			if(this.$v.$invalid) {
				this.$message.error("Please fill in the required fields.")
			} else {
				disableButton('.btn-save', true)
				this.$store.dispatch("settings/workshop/update", {
					id: this.workshop_form.workshop_both_aesthetic_laser_id,
					workshop_sdate: this.workshop_form.workshop_both_aesthetic_laser_start_date,
					workshop_edate: this.workshop_form.workshop_both_aesthetic_laser_end_date,
				})
				.then(res => {
					this.$message.success("Successfully Save Both Workshop Dates")
					disableButton('.btn-save', false)
				})
				.catch(err => {
					this.$message.error('Please fill in the required fields.')
					disableButton('.btn-save', false)
				})
			}
		},
		save() {
			disableButton('.btn-save', true)
			this.$store.dispatch("settings/vcc/update", this.form)
			.then(res => {
				this.$message.success(res.data.message)
				this.getOpeningDate()
				disableButton('.btn-save', false)
			})
			.catch(err => {
				this.$message.error('Please fill in the required fields.')
				disableButton('.btn-save', false)
			})
		}
	},
	mounted() {
		this.setNavbarTitle('VCC')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getOpeningDate()
		this.getOpeningWorkshop()
	}
}
</script>