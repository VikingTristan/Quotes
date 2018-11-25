<template>
  <div 
    class="loader loader-large" 
    data-loader />
</template>
<script>
    export default {
        name: "Callback",
        props: ["auth"],
        data() {
            this.auth.handleAuthentication();
            return {};
        },
        mounted() {
            setTimeout(()=>{
                this.$router.push({
                    name: "Quotes"
                });
            }, 500);
        }
    };
</script>

<style>
    .loader {
        position: absolute;
        display: flex;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        top: 20%;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>