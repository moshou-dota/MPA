import './index.scss'
import { HeaderOptions } from '../../constants/index.js'
const headerTmpl = require('./index.html')
const Handlebars = require("handlebars");

Handlebars.registerHelper('isActive', function (a, b) {
  return a.indexOf(b) > -1? 'active': ''
})
const compile = Handlebars.compile(headerTmpl)

export default {
  init (el, data = {}) {
    $(el).html(compile(Object.assign({}, HeaderOptions, data)))
  }
}
