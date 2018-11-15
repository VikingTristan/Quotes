<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 offset-md-3">
                <section class="panel panel-default">
                    <header>
                        <h2 class="panel-title">Edit quote</h2>
                    </header>
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="author">Author</label>
                                <div class="input-group">
                                    <input v-model="author" type="text" id="author" class="form-control" placeholder="Enter author of quote" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="author">Quote</label>
                                <div class="input-group">
                                    <textarea rows="6" v-model="text" type="text" id="author" class="form-control"
                                        placeholder="Enter quote" />
                                    </div>
                            </div>
                            <button class="btn btn-lg btn-brand" type="button" @click="updateQuote">Update quote</button>
                            <button class="btn btn-xs btn-outline-danger" type="button" @click="deleteQuote">Delete quote</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import QuotesService from "@/services/QuotesService.js";

export default {
    name: "EditQuote",
    data() {
        return {
            text: "",
            author: ""
        };
    },
    mounted() {
        this.getQuote();
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
                this.$snotify.error("You need to be logged in to do that.", "Unauthorized");
                this.$router.push({
                    name: "Login"
                });
            }
        },
        async updateQuote() {
            await QuotesService.updateQuote({
                id: this.$route.params.id,
                text: this.text,
                author: this.author
            });
            this.$router.push({
                name: "Quotes"
            });
        },
        async deleteQuote() {
            try {
                await QuotesService.deleteQuote({
                    id: this.$route.params.id
                });
                this.$snotify.success("Quote deleted");
                this.$router.push({
                    name: "Quotes"
                });
            } catch (e) {
                this.$snotify.error("You need to be logged in to do that.", "Unauthorized");
                this.$router.push({
                    name: "Login"
                });
            }
        }
    }
};
</script>