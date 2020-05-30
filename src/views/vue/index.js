import vue from 'vue'
import header from '@/public/header.vue'

new vue ({
  el: '#app',
  render: h=> h(header)
})
