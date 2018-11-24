<template>
  <div class="row justify-content-center">
    <div class="col-md-12">
      <section class="panel panel-default">
        <header>
          <h2 class="panel-title">Quotes</h2>
        </header>
        <div class="panel-body">
          <div v-if="!fetching">
            <table class="table table-hover" v-if="quotes && quotes.length">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Quote</th>
                  <th scope="col" class="pull-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quote, index) in quotes" v-bind:key=index>
                  <th scope="row" :key="'quote-'+index">{{index +1}}</th>
                  <td>
                    <blockquote>
                      <p>{{quote.text}}</p>
                      <footer>
                        <cite>{{quote.author}}</cite>
                      </footer>
                    </blockquote>
                  </td>
                  <td class="pull-right">
                    <router-link v-bind:to="{name: 'EditQuote', params: {id: quote._id}}" :key="'bob-'+index" class="btn btn-warning">Edit
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else style="padding: 50px; text-align: center;">
              <h1 v-html="shrugGuy"></h1>
              <h2>There are no quotes.</h2>
              <router-link v-bind:to="{ name: 'NewQuote' }" class="btn btn-primary">Add the first Quote</router-link>
            </div>            
          </div>
          <div v-if="errors.api" style="padding: 50px; text-align: center;">
            <h1 v-html="shrugGuy"></h1>
            <h2 class="color-danger">No API connection.</h2>
          </div>
        </div>
        <footer v-if="quotes && quotes.length">
          <router-link v-bind:to="{ name: 'NewQuote' }" class="btn btn-primary btn-lg">
            + Add Quote
          </router-link>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
  import QuotesService from "@/services/QuotesService";

  export default {
    name: "quotes",
    data() {
      return {
        fetching: true,
        errors: {
          api: false
        },
        shrugGuy: "¯\\_(ツ)_/¯¯",
        quotes: []
      };
    },
    mounted() {
      this.getQuotes();
      this.drawShrug();
    },
    methods: {
      async getQuotes() {
        try {
          const response = await QuotesService.fetchQuotes();
          this.fetching = false;
          this.quotes = response.data.quotes;
        } catch (e) {
          this.errors.api = true;
          // console.log("error: ", e);
        }

      },
      drawShrug() {
        setInterval(() => {
          if (this.shrugGuy === "¯\\_(ツ)_/¯¯") {
            this.shrugGuy = "¯¯\\_(ツ)_/¯";
          } else {
            this.shrugGuy = "¯\\_(ツ)_/¯¯";
          }
        }, 1000);
      },
      // async checkLogin() {
      //   const response = await AuthenticationService.checkLogin();
      //   console.log("Response?", response);
      // },
      // async logout() {
      //   const response = await AuthenticationService.logout();
      //   console.log("response here?", response);
      // }
    }
  };
</script>

<style scoped>
  footer {
    text-align: center;
  }
</style>