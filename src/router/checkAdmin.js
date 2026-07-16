import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default function (to, from, next) {
  var token = localStorage.getItem("token_admin");
  axios
    .get("http://192.168.1.228:8000/api/admin/check-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
        console.log("Check token:", res.data);
      if (res.data.status) {
        localStorage.removeItem("ho_ten_admin");
        localStorage.setItem("ho_ten_admin", res.data.name);
        next();
      } else {
        next("/admin/login");
        toaster.error(res.data.message);
      }
    });
}
