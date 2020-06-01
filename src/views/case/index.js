import 'bootstrap';
import '@/assets/css/index.scss'
import './index.scss'

import Http from '@/utils/http'
import {
  addEventListener,
  removeListener,
  getTargetDom
 } from '@/utils'

// 获取模板引擎解析后的渲染函数
import Header from '@/components/header'
import dropDownTmpl from '@/components/case/dropTmpl'
import caseDemoTmpl from '@/components/case/demoTmpl'

// 用于保存当前页面需要编译或渲染的DOM
const pageMap = {
  industryDOM: $('#industry-list'),
  industryTmpl: dropDownTmpl,
  sourceDOM: $('#source-list'),
  sourceTmpl: dropDownTmpl,
  demoDOM: $('#demo-list'),
  demoTmpl: caseDemoTmpl,
  industryList: [],
  sourceList: [],
  demoList: []
}

// 初始化公共头部
function initHeader () {
  const headerData = {
    pageName: 'case'
  }
  Header.init('#header', headerData)
}

function initContent () {
  requestData().then(data => {
    render()
  })
}

function requestData () {
  return Http.caseList().then(res => {
    pageMap.industryList = res.industry
    pageMap.sourceList = res.source
    pageMap.demoList = res.list
    return res
  })
}

function render () {
  pageMap.industryDOM.html(pageMap.industryTmpl({dropList: pageMap.industryList}))
  pageMap.sourceDOM.html(pageMap.industryTmpl({dropList: pageMap.sourceList}))
  pageMap.demoDOM.html(pageMap.demoTmpl({demoList: pageMap.demoList}))
}

function handleDemoFunc (e) {
  let target = getTargetDom(e.target, this)
  if (target.dataset.name) {
    window.location.href = '/case/detail.html?name=' + target.dataset.name
    console.log(target)
  }
}
function handleDropFunc (e) {
  e.preventDefault()
  let target = getTargetDom(e.target, this)
  console.log(target)
}

function initEvent () {
  addEventListener(pageMap.demoDOM[0], 'click', handleDemoFunc)
  addEventListener(pageMap.industryDOM[0], 'click', handleDropFunc)
  addEventListener(pageMap.sourceDOM[0], 'click', handleDropFunc)
}

function init () {
  initHeader()
  initContent()
  initEvent()
}

function destory () {
  window.onbeforeunload = function () {
    removeListener(pageMap.demoDOM[0], 'click', handleDemoFunc)
    removeListener(pageMap.industryDOM[0], 'click', handleDropFunc)
    removeListener(pageMap.sourceDOM[0], 'click', handleDropFunc)
  }
}

init()

destory()
