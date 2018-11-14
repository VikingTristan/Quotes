import Api from "@/services/Api";

export default {
    fetchQuotes () {
        return Api().get("/api");
    },
    addQuote (params) {
        return Api().post("/api/quotes", params);
    },
    updateQuote (params) {
        return Api().put("/api/quotes/" + params.id, params);
    },
    getQuote (params) {
        return Api().get("/api/quote/" + params.id);
    },
    deleteQuote (params) {
        return Api().delete("/api/quotes/" + params.id);
    }
};
