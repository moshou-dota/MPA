import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/css/index.less'
import headerTmpl from '@/public/header'
// 插入公共头部的第三种方法
$('#header').html(headerTmpl({msg: 'hello'}))

$( "#banner-message button" ).on( "click", function( event ) {
  console.log(111)
});
