<template>
  <div id="app">    
    <div class="container mt-3">
      <button 
        v-if="!authenticated" 
        type="button"
        class="btn btn-sm btn-primary"
        @click="login()">
        <i class="material-icons">security</i>
        <span>Hackerman</span>
      </button>
      <button 
        v-if="authenticated" 
        type="button"
        class="btn btn-sm btn-danger"
        @click="logout()">
        <i class="material-icons">exit_to_app</i>
        <span>Hackerman OUT!</span>
      </button>
      <router-view 
        :auth="auth" 
        :authentication="authenticated"/>
    </div>
  </div>
</template>

<script>
  import AuthService from "@/services/AuthService";

  const auth = new AuthService();

  const {
    login,
    logout,
    authenticated,
    authNotifier
  } = auth;

  export default {
    name: "App",
    data() {
      authNotifier.on("authChange", authState => {
        this.authenticated = authState.authenticated;
      });
      return {
        auth,
        authenticated
      };
    },
    methods: {
      login,
      logout
    }
  };
</script>

<style>
  body {
    background-color: #03a5ff73;
  }
</style>