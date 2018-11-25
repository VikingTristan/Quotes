import Api from "@/services/Api";

export default {
    fetchQuotes () {
        return Api().get("/");
    },
    addQuote (params) {
        return Api().post("quotes", params);
    },
    updateQuote (params) {
        return Api().put("quotes/" + params.id, params);
    },
    getQuote (params) {
        return Api().get("quote/" + params.id);
    },
    deleteQuote (params) {
        return Api().delete("quotes/" + params.id);
    }
};
