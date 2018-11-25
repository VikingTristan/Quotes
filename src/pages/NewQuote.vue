<template>
  <div class="row justify-content-center">
    <div class="col-md-12">
      <section class="panel panel-default">
        <header>
          <h2 class="panel-title">Add quote</h2>
        </header>
        <div class="panel-body">
          <form>
            <div class="form-group">
              <label for="author">Author</label>
              <div class="input-group">
                <input 
                  id="author" 
                  v-model="author" 
                  autofocus 
                  type="text" 
                  class="form-control"
                  placeholder="Enter author of quote" >
              </div>
            </div>
            <div class="form-group">
              <label for="author">Quote</label>
              <div class="input-group">
                <textarea 
                  id="author" 
                  v-model="text" 
                  rows="6" 
                  type="text" 
                  class="form-control"
                  placeholder="Enter quote" />
              </div>
            </div>
            <button 
              class="btn btn-primary pull-right" 
              type="button" 
              @click="addQuote">Submit quote</button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import QuotesService from "@/services/QuotesService";
const px = window.px || {};

export default {
    name: "NewQuote",
    props: ["auth"],
    data () {
        return {
            text: "",
            author: ""
        };
    },
    mounted(){
      if(!this.auth.authenticated){
            px.toast({html:"Access denied, friend.", type:"danger"});
            this.$router.push({
                name:"Quotes"
            });
        }
    },
    methods: {
        async addQuote () {
            await QuotesService.addQuote({
                text: this.text,
                author: this.author
            });
            px.toast({html:"Quote added", type:"success"});
            this.$router.push({
                name: "Quotes"
            });
        }
    }
};

</script>