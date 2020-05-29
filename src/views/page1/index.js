import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/index.less'
const Handlebars = require("handlebars");
const data = {
   title: '你好',
   body: 'boy'
  }
console.log(Handlebars.compile)
const template = Handlebars.compile($('#classify').html());
$('#app').html(template(data))
