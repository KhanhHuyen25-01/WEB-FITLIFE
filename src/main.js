import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import LayoutAdmin from './layout/wrapper/Admin/layoutAdmin.vue'
import Blank from './layout/wrapper/blank.vue'

// Import JS assets
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/jquery.min.js";
import "./assets/plugins/simplebar/js/simplebar.min.js";
import "./assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";

// Import CSS assets
import "./assets/plugins/simplebar/css/simplebar.css";
import "./assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/plugins/metismenu/css/metisMenu.min.css";
import "./assets/css/pace.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap-extended.css";
import "./assets/css/app.css";
import "./assets/css/icons.css";
import "./assets/css/dark-theme.css";
import "./assets/css/semi-dark.css";
import "./assets/css/header-colors.css";

const app = createApp(App)

app.use(router)
app.component("admin-layout", LayoutAdmin);
app.component("blank-layout", Blank);

app.mount('#app')
