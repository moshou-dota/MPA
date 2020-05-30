import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/css/index.less'
import vue from 'vue'
import header from '@/public/header.vue'

new vue ({
  el: '#app',
  render: h=> h(header)
})


$( "#banner-message button" ).on( "click", function( event ) {
  console.log(111)
});
