import 'bootstrap';
import '@/assets/css/index.scss'
import './index.scss'
import Header from '@/components/header'
// 初始化公共头部
const headerData = {
  pageName: 'product'
}
Header.init('#header', headerData)
