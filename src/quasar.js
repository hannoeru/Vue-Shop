import Vue from 'vue'

import './styles/quasar.sass'
import lang from 'quasar/lang/zh-hant.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Quasar, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: {
      /* look at QUASARCONFOPTIONS from the API card (bottom of page) */
    }
  },
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify
  },
  lang: lang
})
