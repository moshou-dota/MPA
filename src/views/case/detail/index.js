import 'bootstrap';
import '@/assets/css/index.scss'
import './index.scss'

import Http from '@/utils/http'
import {
  addEventListener,
  removeListener,
  getTargetDom,
  urlQuery
} from '@/utils'

import Header from '@/components/header'
import navTmpl from '@/components/case/detail/nav'
import bannerTmpl from '@/components/case/detail/banner'
import contentTmpl from '@/components/case/detail/content'

const pageMap = {
  bannerDOM: $('#detail-banner'),
  bannerTmpl: bannerTmpl,
  navDOM: $('#detail-nav'),
  navTmpl: navTmpl,
  contentDOM: $('#detail-content'),
  contentTmpl: contentTmpl,
  banner: [],
  nav: [],
  content: [],
  btnsDOM: $('#detail-btns')
}

// 初始化公共头部
function initHeader () {
  const headerData = {
    pageName: 'case'
  }
  Header.init('#header', headerData)
}

function initContent () {
  requestData().then(() => {
    render()
  })
}

function requestData () {
  return Http.caseDetail().then(res => {
    pageMap.nav = res.banner.name
    pageMap.banner = res.banner
    pageMap.content = res.content
    return res
  })
}

function render () {
  pageMap.navDOM.html(pageMap.navTmpl(pageMap.nav))
  pageMap.bannerDOM.html(pageMap.bannerTmpl(pageMap.banner))
  pageMap.contentDOM.html(pageMap.contentTmpl(pageMap.content))
}

function handleBtnClicFunc (e) {
  let target = getTargetDom(e.target, this)
  const action = target.dataset && target.dataset.action
  if (action) {
    let query = urlQuery()
    console.log(target)
    let href = window.location.href.split('?')[0] + '?name=' + query.name.slice(0, query.name.length - 1)
    if (action === 'prev') {
      window.location.href = href + ((+query.name.slice(-1)) - 1)
    } else {
      window.location.href = href + ((+query.name.slice(-1)) + 1)
    }
  }
}

function initEvent () {
  addEventListener(pageMap.btnsDOM[0], 'click', handleBtnClicFunc)
}


function init () {
  initHeader()
  initContent()
  initEvent()
}

function destory () {
  window.onbeforeunload = function () {
    removeListener(pageMap.btnsDOM[0], 'click', handleBtnClicFunc)
  }
}

init()

destory()
