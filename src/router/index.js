import Vue from "vue";
import Router from "vue-router";
import Quotes from "@/pages/Quotes.vue";
import NewQuote from "@/pages/NewQuote.vue";
import EditQuote from "@/pages/EditQuote.vue";
import Callback from "@/pages/Callback.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "Quotes",
            component: Quotes
        },
        {
            path: "/quotes/new",
            name: "NewQuote",
            component: NewQuote
        },
        {
            path: "/quotes/:id",
            name: "EditQuote",
            component: EditQuote
        },
        {
            path: "/callback",
            name: "Callback",
            component: Callback
        }
    ]
});