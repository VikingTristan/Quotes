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
                         <button class="btn btn-brand pull-right" type="button" @click="addQuote">Submit quote</button>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import QuotesService from "@/services/QuotesService";

export default {
    name: "NewQuote",
    data () {
        return {
            text: "",
            author: ""
        };
    },
    methods: {
        async addQuote () {
            await QuotesService.addQuote({
                text: this.text,
                author: this.author
            });
            this.$snotify.success("Quote added");
            this.$router.push({
                name: "Quotes"
            });
        }
    }
};

</script>