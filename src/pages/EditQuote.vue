<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <section class="panel panel-default">
          <header>
            <h2 class="panel-title">Edit quote</h2>
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
                    placeholder="Enter author of quote">
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
                class="btn btn-lg btn-primary" 
                type="button" 
                @click="updateQuote">Update quote</button>
              <button 
                class="btn btn-xs btn-outline-danger" 
                type="button" 
                @click="deleteQuote">Delete quote</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import QuotesService from "@/services/QuotesService.js";
const px = window.px || {};

export default {
    name: "EditQuote",
    props: ["auth"],
    data() {
        return {
            text: "",
            author: ""
        };
    },
    mounted() {
        if(!this.auth.authenticated){
            px.toast({html:"Access denied, friend.", type:"danger"});
            this.$router.push({
                name:"Quotes"
            });
        } else {
            this.getQuote();
        }
    },
    methods: {
        async getQuote() {
            try {
                const response = await QuotesService.getQuote({
                    id: this.$route.params.id
                });
                this.text = response.data.text;
                this.author = response.data.author;
            } catch (e) {
                px.toast({html: "Unable to fetch quote...", type: "danger"});
            }
        },
        async updateQuote() {
            await QuotesService.updateQuote({
                id: this.$route.params.id,
                text: this.text,
                author: this.author
            });
            px.toast({html: "Quote updated", type:"success"});
            this.$router.push({
                name: "Quotes"
            });
        },
        async deleteQuote() {
            try {
                await QuotesService.deleteQuote({
                    id: this.$route.params.id
                });
                px.toast({html:"Quote deleted", type:"success"});
                this.$router.push({
                    name: "Quotes"
                });
            } catch (e) {
                px.toast({html:"Unable to delete quote...", type:"danger"});
                console.log("Err: ", e);
            }
        }
    }
};
</script>