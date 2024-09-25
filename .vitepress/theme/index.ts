import Layout from './Layout.vue'
import CustomComment from './components/CustomComment.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('CustomComment' , CustomComment)
  }
} 