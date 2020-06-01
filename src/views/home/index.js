import 'bootstrap';
import '@/assets/css/index.scss'
import './index.scss'
import Header from '@/components/header'
import Http from '@/utils/http'
// 初始化公共头部
const headerData = {
  pageName: 'home'
}
Header.init('#header', headerData)
Http.test().then(res => {
  console.log('request==', res)
})
