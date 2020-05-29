import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/css/index.less'

const Handlebars = require("handlebars");
var JSON_DATA =
[
    {
        "title" : "德国iPhone禁售令的最新相关信息",
        "date" : "2018-12-21",
        "tag" : "今日热点"
    },
    {
        "title" : "RNG战胜EDG的最新相关信息RNG战胜EDG是怎么回事",
        "date" : "2018-12-20",
        "tag" : "电竞热点"
    },
    {
        "title" : "德国iPhone禁售令的最新相关信息",
        "date" : "2018-12-21",
        "tag" : "今日热点"
    },
    {
        "title" : "RNG战胜EDG的最新相关信息RNG战胜EDG是怎么回事",
        "date" : "2018-12-20",
        "tag" : "电竞热点"
    }
]
;
//通过模板定义的id获取模板
var tpl = $("#newsListTemplate").html();
//预编译模板
var template = Handlebars.compile(tpl);
//传入需要填充的数据匹配
var html = template(JSON_DATA);
//插入模板到ul中
$("#newsList").html(html);
