import auth0 from "auth0-js";
import EventEmitter from "EventEmitter";
import router from "@/router";

const px = window.px || {};

export default class AuthService {

    authenticated = this.isAuthenticated()
    authNotifier = new EventEmitter()

    constructor() {
        this.login = this.login.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    auth0 = new auth0.WebAuth({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
        redirectUri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
        responseType: "token id_token",
        scope: "openid"
    })

    // looks for an authentication result in the URL hash and processes it with the parseHash method from auth0.js
    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                router.push({
                    name: "Quotes"
                });
            } else if (err) {
                px.toast({html:err.errorDescription, type:"danger"});
                router.push({
                    name: "Quotes"
                });
                console.log(err);
            }
        });
    }

    // sets the user's Access Token, ID Token, and a time at which the Access Token will expire
    setSession(authResult) {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
        console.log("Auth result?", authResult);
        px.toast({html:"You are logged in.", type:"success"});
        this.authNotifier.emit("authChange", {
            authenticated: true
        });
    }

    login() {
        this.auth0.authorize();
    }

    // removes the user's tokens from browser storage
    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.userProfile = null;
        this.authNotifier.emit("authChange", false);

        px.toast({html:"You are logged out.", type:"success"});
        // navigate to the home route
        router.push({
            name: "Quotes"
        });
    }

    // checks whether the expiry time for the Access Token has passed
    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

}