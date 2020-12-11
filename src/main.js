import Vue from 'vue'
import App from './App.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRedoAlt,
  faPlay,
  faPause,
  faTags,
} from '@fortawesome/free-solid-svg-icons';

library.add(faRedoAlt);
library.add(faPlay);
library.add(faPause);
library.add(faTags);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
