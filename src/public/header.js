const Handlebars = require("handlebars");

const commonHeader = `
  <div class="header">
    <h1>这是一段公共头部</h1>
    <p>{{msg}}</p>
  </div>
`
//预编译模板
export default Handlebars.compile(commonHeader);
//传入需要填充的数据匹配
// const html = template({msg: '这是一段描述文件'});
//插入模板到ul中
// $("#header").html(html);
