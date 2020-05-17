import Vue from "vue";
import App from "./App.vue";
// ElementUI import
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 字体图标
import "font-awesome/css/font-awesome.min.css";
// ElementUI use
Vue.use(ElementUI, {
  size: "small"
});

Vue.config.productionTip = false;

// 为方便调试，故挂载到window
window.blueju = new Vue({
  render: (h) => h(App)
}).$mount("#app");
