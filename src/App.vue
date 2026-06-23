<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
// Import basic bootstrap JS
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/jquery.min.js";
import "./assets/plugins/simplebar/js/simplebar.min.js";
import "./assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";

export default {
  name: "App"
}
</script>

<style>
@import "./assets/plugins/simplebar/css/simplebar.css";
@import "./assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "./assets/plugins/metismenu/css/metisMenu.min.css";
@import "./assets/css/pace.min.css";
@import "./assets/css/bootstrap.min.css";
@import "./assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");
@import "./assets/css/app.css";
@import "./assets/css/icons.css";
@import "./assets/css/dark-theme.css";
@import "./assets/css/semi-dark.css";
@import "./assets/css/header-colors.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

/* Apply global font overrides for a premium feel */
body {
  font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif !important;
  background-color: #f1f5f9;
}
</style>

