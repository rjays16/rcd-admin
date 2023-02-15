<template>
  <section>
    <div class="modal fade" id="abstract-preview-edit" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title" id="abstract-guidelines">Abstract Presenter</h5>
            <button type="button" class="close upper-AbstractPreviewEditright-close btn-close corner-circle" data-dismiss="modal" aria-label="Close">X</button>
          </div>
          <div class="modal-body" id="print">
            <div class="content">
             <div class="container">
               <div class="row">
                 <table border="0">
                   <tr>
                     <td width="282" height="61"><strong>Category:</strong></td>
                     <td width="377">
                       <el-select v-model="$v.form.abstract_category.$model">
                         <el-option
                           v-for="option in category"
                           :key="option.id"
                           :label="option.category_value"
                           :value="option.category_value"
                         />
                       </el-select>
                     </td>
                   </tr>
                   <tr>
                     <td height="61"><strong>Title:</strong></td>
                     <td>
                       <el-input v-model="$v.form.title.$model"></el-input>
                       <div class="note-small color-FF2C2C" v-if="!$v.form.title.required">Required</div>
                       <div class="note-small color-FF2C2C" v-if="!$v.form.title.maxLength">Max of {{ $v.form.title.$params.maxLength.max }} characters.</div>
                     </td>
                   </tr>
                   <tr>
                     <td height="61"><strong>Submitting Author:</strong></td>
                     <td><el-input v-model="form.authors.fullname"></el-input></td>
                   </tr>
                   <tr>
                     <td height="61"><strong>Finalist?</strong></td>
                     <td>
                       <el-radio v-model="form.is_finalist"
                                 v-for="option in finalist"
                                 :key="option.id"
                                 :label="option.value"
                                 :value="option.value"
                                 class="blue-input">
                         {{ option.name }}
                       </el-radio>
                     </td>
                   </tr>
                   <tr v-if="form.is_finalist">
                      <td height="61"><strong>Final Category</strong></td>
                      <td>
                        <el-radio v-model="form.abstract_type"
                            v-for="option in types"
                            :key="option.id"
                            :label="option.id"
                            :value="option.id"
                            class="blue-input">
                            {{ option.name }}
                        </el-radio>
                      </td>
                   </tr>
                   <tr>
                     <td height="61" v-if="form.abstract_type !== 2"><strong>Insert Embed PDF URL:</strong></td>
                     <td height="61" v-else><strong>Insert Embed Video URL:</strong></td>
                     <td height="61">
                       <textarea name="textarea" id="textarea" cols="45" rows="5" v-if="form.is_finalist === false" disabled>
                       </textarea>
                       <textarea name="textarea" id="textarea" cols="45" rows="5" v-model="$v.form.embed_url.$model" v-else >
                       </textarea>
                       <div class="note-small color-FF2C2C" v-if="!$v.form.embed_url.maxLength">Max of {{ $v.form.embed_url.$params.maxLength.max }} characters.</div>
                     </td>
                   </tr>
                 </table>
               </div>
             </div>
          <div class="modal-footer avenir-bold justify-content-center">
            <button type="button" class="btn btn-blue corner-30px text-uppercase fa fa-check" @click="update()">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import { mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators/";
export default {
  name: "Edit",
    data(){
      return {
        finalist:this.$store.state.options.yesNoOptions,
        abstract_id: false,
        is_preview: false,
        category: [],
        form:{
          id: null,
          embed_url: null,
          is_finalist: false,
          abstract_type: null,
          title: null,
          structured_abstract: null,
          keywords: null,
          is_conflict_interest: null,
          conflict_interest: null,
          commercial_funding: null,
          submission_date: null,
          abstract_category: null,
          study_design: null,
          authors: [{
            fullname: null,
            first_name: null, last_name: null,
            city: null, country: null,
            email: null,
            institution: null, department: null,
            affiliation_city: null, affiliation_country: null
          }],
        },

        types: this.$store.state.abstract.types,
      }
  },
  validations: {
    form: {
      abstract_category: {
        maxlength: maxLength(255)
      },
      title: {
        required,
        maxLength: maxLength(255)
      },
      embed_url: {
        maxLength: maxLength(255)
      }

    },
  },
  methods: {
    getCategory(){
         this.$store.dispatch('members/getCategoryList')
        .then(res => {
        this.category = res.data
        })
    },
    preview(abstractData, formAuthor){
      const moment = require('moment');

      console.log("Abstract Data for Preview: ", abstractData)
      this.form.id = abstractData.id
      this.form.is_finalist = abstractData.is_finalist
      this.form.embed_url = abstractData.embed_url
      this.form.title = abstractData.title
      this.form.commercial_funding = abstractData.commercial_funding
      this.form.is_commercial_funding = abstractData.is_commercial_funding
      this.form.is_conflict_interest = abstractData.is_conflict_interest
      this.form.study_design = abstractData.study_design
      this.form.keywords = abstractData.keywords
      this.form.abstract_type = abstractData.abstract_type
      this.form.conflict_interest = abstractData.conflict_interest
      this.form.abstract_category = abstractData.abstract_category
      this.form.structured_abstract = abstractData.structured_abstract
      this.form.submission_date = moment(new Date(abstractData.created_at)).format("MMMM DD, YYYY")
      this.form.authors = formAuthor;
      this.form.authors.fullname = formAuthor[0].first_name + " " + formAuthor[0].last_name;
      console.log(this.form.is_finalist)
    },
    editModal(id, is_preview){
      this.abstract_id = id
      this.is_preview = is_preview
      this.$store.dispatch("abstract/getAbstract", id)
        .then(res => {
          var data = res.data;
          this.preview(data, data.authors)
          $('#abstract-preview-edit').modal('show');
        })
    },
    update(){
      this.$store.dispatch("abstract/updateAbstract", this.form)
        .then(res => {
          this.$message.success(res.data.message)
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
  },
  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>
