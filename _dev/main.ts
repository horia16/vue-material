import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import { createVueMaterial } from "../src";

const vueMaterial = createVueMaterial({
  color: "#6750A4",
  icon: { component: Icon, key: "icon", defaults: { width: "18", height: "18" } }
});

createApp(App).use(vueMaterial).mount("#app");
