<template>
  <div class="modal fade" id="sending" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content remove-white-divs">
        <div class="modal-body">
          <div class="container">
            <div class="row">
            <img src="img/loading.png"><p class="avenir-regular adjust-text">Sending email invoice to recipient...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
name: "SendingEmail",
  data(){
    return{
      is_preview: false
    }
  },
  methods: {
    openmodals(is_preview) {
      this.is_preview = is_preview
      $('#sending').modal('show');
      setTimeout(function (){
        $('#sending').modal('hide')}, 6000);
    }
  },
}
</script>

<style scoped>
.modal{
  border: none !important;
}
.remove-white-divs{
  margin-top: 53%;
  margin-left: -2%;
  background-color: transparent !important;
}
img {
  margin-left: 25%;
}
.adjust-text{
  margin-left:3%;
  margin-top: 2%;
}
</style>
