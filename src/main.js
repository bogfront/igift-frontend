import { createApp } from 'vue'
import { ElButton, ElForm,
  ElFormItem, ElInput,
  ElSelect, ElOption,
  ElRadio, ElNotification,
  ElDrawer, ElSteps,
  ElStep, ElDialog,
  ElCarousel, ElCarouselItem,
  ElTooltip
} from 'element-plus'

import App from './App.vue'
import router from "./router";
import store from './store'

import './styles/common/_index.scss'
import './styles/element/_el-button.scss'

const app = createApp(App)

// router
app.use(router);

// vuex
app.use(store);

// element plus
app.component(ElButton.name, ElButton);
app.component(ElForm.name, ElForm);
app.component(ElFormItem.name, ElFormItem);
app.component(ElInput.name, ElInput);
app.component(ElSelect.name, ElSelect);
app.component(ElOption.name, ElOption);
app.component(ElRadio.name, ElRadio);
app.component(ElNotification.name, ElNotification);
app.component(ElDrawer.name, ElDrawer);
app.component(ElSteps.name, ElSteps);
app.component(ElStep.name, ElStep);
app.component(ElDialog.name, ElDialog);
app.component(ElCarousel.name, ElCarousel);
app.component(ElCarouselItem.name, ElCarouselItem);
app.component(ElTooltip.name, ElTooltip);

app.mount('#app')
