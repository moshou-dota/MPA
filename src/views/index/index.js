// @import "custom";
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/css/index.css'

import 'bootstrap';


var hiddenBox = $( "#banner-message" );
console.log('hiddenBox=====', $( "#banner-message button" ))
$( "#banner-message button" ).on( "click", function( event ) {
  console.log(111)
});
