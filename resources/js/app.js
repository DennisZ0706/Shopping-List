import './bootstrap';
import '../sass/app.scss'
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue';
import app from './api/app.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faPlusSquare, faTrash, faSquareXmark, faPencil, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faPlusSquare, faTrash, faSquareXmark, faPencil, faAngleUp)

createApp(app)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')