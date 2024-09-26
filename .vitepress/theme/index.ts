import Layout from './Layout.vue'
import CustomComment from './components/CustomComment.vue'
import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';

import { onMounted, watch, nextTick } from 'vue';


import './style/index.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('CustomComment', CustomComment)
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

  },

} 