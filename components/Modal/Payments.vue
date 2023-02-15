<template>
  <section>
    <div class="modal fade" id="payment" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payment Order Summary</h5>
            <a type="button" @click="downloadPdf()"><img src="img/Print.png"></a>
          </div>
          <div class="modal-body mb-6" id="print">
            <div class="content">
              <div class="gray">
                <div class="container adjust">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-2">
                        <img src="img/rcd_logo.png"><br>
                      </div>
                      <div class="mb-4">
                        <small class="avenir-regular mb-4">www.rcd2022manila.com.ph</small>
                      </div>
                      <div class="mb-4">
                        <small class="avenir-bold">Paid By:</small>
                      </div>
                      <div>
                        <small class="avenir-bold text-uppercase">{{form.fullname}}</small>
                      </div>
                      <div class="mb-3">
                        <small class="avenir-regular">{{form.registration_name}}</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular">{{ form.email }}</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-bold">Payment Date:</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular">{{ form.date_paid }}</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular"> </small>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-4 adjust-paidby">
                        <small class="avenir-bold">Paid To:</small>
                      </div>
                      <div>
                        <small class="avenir-bold text-uppercase">philippine dermatological society</small>
                      </div>
                      <div class="mb-3">
                        <small class="avenir-regular">Regional Conference of Dermatology 2022</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular">registration@rcd2022manila.com.ph</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-bold">Payment Method:</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular">Ideapay(Debit/Credit Card Options)</small>
                      </div>
                      <div class="mb-5">
                        <small class="avenir-regular"> </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="container adjust">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="adjust" v-if="show_loader === true">
                        <img src="img/loading.png"><span class="avenir-regular marg-text">Sending email invoice to recipient...</span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-6"></div>
                    <div class="adjust-table">
                      <table width="840" class="table mb-2 text-color">
                        <tr>
                          <td width="270" class="text-uppercase"><small>description</small></td>
                          <td width="100" class="text-uppercase"><small>rate</small></td>
                          <td width="130" class="text-uppercase"><center><small>convenience<br>fee</small></center></td>
                          <td width="100" class="text-uppercase"><small>amount</small></td>
                        </tr>
                      </table>
                      <table class="table" width="840 mb-5">
                        <tr v-for="(workshop, id) in workshops" :key="id">
                          <td width="270" :class="workshop.Workshop_Name == 'Both Aesthetic and Laser' ? 'remove' : 'display'">
                            <small>{{workshop.Workshop_Name != null ? workshop.Workshop_Name : "Registration"}}</small>
                          </td>
                          <td width="130" :class="workshop.Workshop_Name == 'Both Aesthetic and Laser'  ? 'remove' : 'display'">
                            <small>Php. {{ formatDecimal(workshop.Order_Amount)}}</small>
                          </td>
                          <td width="130" :class="workshop.Workshop_Name == 'Both Aesthetic and Laser' ? 'remove' : 'display'">
                            <small>Php. {{ formatDecimal(workshop.Convenience_Fee) }}</small>
                          </td>
                          <td width="100" :class="workshop.Workshop_Name == 'Both Aesthetic and Laser' ? 'remove' : 'display'">
                            <small>Php. {{ formatDecimal(parseFloat(workshop.Order_Amount) + parseFloat(workshop.Convenience_Fee),2) }}</small>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><small class="text-uppercase">total</small></td>
                          <td></td>
                          <td><small v-for="(workshop, id) in workshops" :key="id"
                                     :class="workshop.Workshop_Name == 'Aesthetic' || workshop.Workshop_Name == 'Laser' || workshop.Workshop_Name == null ?
                                     'remove' : 'display'">
                            Php. {{  formatDecimal(parseFloat(workshop.Order_Amount) + parseFloat(workshop.Convenience_Fee) + parseFloat(registration_fee) + parseFloat(registration_Convenience_Fee),2) }} </small></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer avenir-bold justify-content-center">
            <div v-for="(payment, id) in form" :key="id">
              <button type="button" class="btn btn-blue corner-22px text-uppercase" @click="resendPaymentEmail(payment)"
                      :class="id != 0 ? 'remove' : 'display'">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <ModalSendingEmail ref="Sending"/>-->
  </section>
</template>

<script>
import $ from "jquery";
import { formatDecimal, disableButton, toUpper } from "~/components/Helper/functions.js";
import * as pdfMake from 'pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import printHtmlToPDF from "print-html-to-pdf";

export default {
  name: "Payments",
  components: {
    printHtmlToPDF
  },
  data() {
    return {
      is_preview: false,
      registration_fee: null,
      registration_Convenience_Fee: null,
      show_loader: false,
      form: {
        id: null,
        member_id: null,
        fullname: null,
        registration_name: null,
        email: null,
        date_paid: null,
      },
      workshops: [{}],
    }
  },
  methods: {
    preview(data){
      const moment = require('moment');
      this.form = data;
      this.form.id = data[0].member.user.id
      this.form.payments_ids = data[0].member.payments;
      this.form.fullname = data[0].member.user.full_name;
      this.form.registration_name = data[0].member.registration_type.name;
      this.form.email = data[0].member.user.email;
      this.form.date_paid = moment(new Date(data[0].member.payments[0].date_paid)).format("MMMM DD, YYYY");
      console.log(data[0].member)
      this.form.id = data[0].member.user_id;
      this.form.member_id = data[0].member.id
      this.$store.dispatch("members/getOrderPayments", this.form.id)
        .then(res => {
          var order_data = res.data;
          this.workshops = order_data;
          this.registration_fee = order_data[0].Order_Amount;
          this.registration_Convenience_Fee = order_data[0].Convenience_Fee;
        })
    },
    formatDecimal(value, places) {
      return formatDecimal(value, places);
    },
    downloadPdf(){
      var element = document.getElementById('print');
      const pdfOption = {
        jsPDF: {
          unit: 'px',
          format: 'letter',
          orientation: "portrait",
        },
        spin: false,
        fileName: 'Payment',
        pageRanges: 1,
        fitToPage: true
      }
      printHtmlToPDF.print(element, pdfOption)
    },
    getBase64ImageFromURL(url) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var dataURL = canvas.toDataURL("img/png");

          resolve(dataURL);
        };

        img.onerror = error => {
          reject(error);
        };

        img.src = url;
      });
      },
    openmodal(id, is_preview) {
      this.is_preview = is_preview
      this.$store.dispatch("payments/getPaymentUsers", id)
        .then(res => {
          var data = res.data;
          this.preview(data)
          $('#payment').modal('show');
        })
        .then()
    },
    closeModal(){
      this.show_loader = false;
      setTimeout(function (){
        $('#payment').modal('hide')}, 1000);
    },
    resendPaymentEmail(ledger_item) {
      this.show_loader = true;
      $('#sending').modal('show');
      setTimeout(function (){
        $('#sending').modal('hide')}, 6000);
      let data = {
        member_id: ledger_item.member.id,
        payment_id: ledger_item.member.payments[0].id
      }
      this.$store.dispatch("members/resendPaymentEmail", data)
        .then((res) => {
          this.$message.success(res.data.message)
          this.closeModal();
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },

  },
  async createPdf() {
    var docDefinition = {
      content: [

        {
          image: await this.getBase64ImageFromURL(
            "/img/rcd_logo.png"
          )
        }]
    }
  }
}
</script>

<style scoped>
.modal-header{
  margin-top: 2%;
}
.gray{
  background-color: #DDE8ED;
}
.adjust{
  margin-left: 7%;
  margin-top: 7%;
}
.adjust-paidby{
  margin-top: 43%;
}
.text-color{
  color: gray;
}
.modal-footer{
  border: none !important;
}
.remove{
  display: none;
}
.adjust-table{
  margin-top: 10%;
}
.table{
  width: 110%;
}
.adjust{
  margin-left: 8%;
}
.marg-text {
  margin-left: 4%;
}
</style>
