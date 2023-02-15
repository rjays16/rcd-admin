<template>
    <section>
      <div class="modal fade" id="addFreepaper" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header ">
              <h5 class="modal-title" id="abstract-guidelines">Add Free Paper</h5>
              <button type="button" class="close btn-close corner-circle" data-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body" id="print">
              <div class="content">
                <div class="container">
                  <div class="row mb-2">
                    <div class="col-12">
                      <label>Category:</label>
                      <el-select v-model="$v.form.abstract_category.$model" class="w-100">
                        <el-option v-for="option in categories"
                          :key="option.id"
                          :label="option.category_value"
                          :value="option.category_value"/>
                      </el-select>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <label>Title:</label>
                      <el-input v-model="$v.form.title.$model"></el-input>
                      <div v-if="$v.form.title.$dirty">
                        <div class="note color-FF2C2C" v-if="!$v.form.title.required">Required</div>
                        <div class="note color-FF2C2C" v-if="!$v.form.title.maxLength">Max of {{ $v.form.title.$params.maxLength.max }} characters.</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="row mt-3">
                    <div class="col-12">
                      <label>Convention Member:</label>
                      <el-select v-model="$v.form.abstract_id.$model" @change="selectAuthor" filterable class="w-100">
                        <el-option v-for="author in members"
                          :key="author.id"
                          :label="author.user.first_name + ' ' + author.user.last_name"
                          :value="author.id" />
                      </el-select>
                    </div>
                  </div> -->
                  <div class="row mt-3">
                    <div class="col-12">
                      <div v-for="(author, index) in authors" :key="index" :set="v = $v.authors.$each[index]">
                       <div class="avenir-regular">
                        <label v-if="index === 0">Submitting author</label>
                        <label v-else>Submitting author : {{index+1}}</label>
                          <button type="button" class="btn btn-blue btn-minus corner-circle d-inline-block bs-0 float-right mb-2" v-if="index > 0" @click="removeAuthor(index)">X</button>
                        <el-input v-model="author.first_name" placeholder="Author's Firstname"/>
                        <el-input class="mt-2 mb-2" v-model="author.last_name" placeholder="Author's Lastname"/>
                          </div>
                       </div>
                      <div class="text-center my-4">
                  <button class="btn btn-blue btn-add corner-circle d-inline-block bs-0" @click="addAuthor(limit)">
                        +
                  </button>
                    <h4 class="avenir-medium fw-bold pt-2 mb-0 d-inline-block">Add Author</h4>
                  </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <label>Finalist?</label>
                      <div>
                        <el-radio v-model="form.is_finalist"
                          v-for="option in yesNo"
                          :key="option.id"
                          :label="option.value"
                          :value="option.value"
                          class="blue-input">
                          {{ option.name }}
                        </el-radio>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <label>Embed PDF URL:</label>
                      <el-input type="textarea" :rows="4" v-model="$v.form.embed_url.$model" />
                      <div v-if="$v.form.embed_url.$dirty">
                        <div class="note color-FF2C2C" v-if="!$v.form.embed_url.required">Required</div>
                        <div class="note color-FF2C2C" v-if="!$v.form.embed_url.maxLength">Max of {{ $v.form.embed_url.$params.maxLength.max }} characters.</div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="modal-footer avenir-bold justify-content-center">
                  <button type="button" class="btn btn-blue btn-save corner-30px text-uppercase" @click="recheckInputs">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </template>

  <script>
  import { disableButton } from "~/components/Helper/functions.js"
  import { required, maxLength } from 'vuelidate/lib/validators/'
  import $ from 'jquery';
  export default {
    data(){
      return {
        limit: 1,
        form: {
          index: 0,
          abstract_type: 2,
          is_finalist: false,
          // convention_member_id: null,
          abstract_category: null,
          title: null,
          embed_url: null,

          structured_abstract: "",
          keywords: null,
          is_conflict_interest: false,
          conflict_interest: null,
          commercial_funding: null,
          submission_date: null,
          study_design: null,
        },
        authors: [{
            first_name: null, last_name: null,
            city: null, country: null,
            email: null,
            institution: null, department: null,
            affiliation_city: null, affiliation_country: null
          }],
        finalist: this.$store.state.options.finalcategory,
        types: this.$store.state.abstract.types,
        categories: [],
        members: [],

        yesNo: this.$store.state.options.yesNoOptions,
      }
    },
    validations: {
      form: {
        abstract_category: {
          required,
        },
        title: {
          required,
          maxLength: maxLength(255)
        },
        embed_url: {
          required,
          maxLength: maxLength(255)
        }
      },
      authors: {
        $each: {
          first_name: { required },
          last_name: { required }
        }
      }
    },
    methods: {
      addAuthor() {
        if(this.limit != 6){
          const limit = Number(this.limit);
          this.authors = [...Array(limit).keys()].map(i => this.authors[i] || {});
          this.limit++;
        } else {
          this.$message.error("Maximum of 5 authors only per abstract submission.")
        }
      },
      getAllMembers() {
        this.$store.dispatch('members/getAllMembers')
        .then(res => {
          this.members = res.data
          console.log(this.members)
        })
        .catch(err => {
          console.error(err)
        })
      },
      getCategories() {
        this.$store.dispatch('abstract/getCategories')
        .then(res => {
          this.categories = res.data
        })
        .catch(err => {
          console.error(err)
        })
      },
      removeAuthor(index) {
        if(index > 0) {
          this.authors.splice(index, 1);
        }
        this.limit--;
      },
      recheckInputs() {
        this.$v.$touch()
        if(this.$v.$invalid) {
          this.$message.error("Please fill in the required fields.")
        } else {
          this.save()
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      },
      save() {
        disableButton('.btn-save', true)

        this.$store.dispatch("abstract/createFromAdmin", this.form, this.form.authors = this.authors)
        .then(res => {
          this.$message.success(res.data.message)
            $('#addFreepaper').modal('hide');
        })
        .catch(err => {
          this.$message.error(err)
          disableButton('.btn-save', false)
        })
      },
      searchMember(value) {
        console.log(value)
      },
      // selectAuthor(author_id) {
      //   this.form.convention_member_id = author_id
      // }
    },
    mounted() {
      this.getCategories()
      // this.getAllMembers()
    }
  }

  </script>
