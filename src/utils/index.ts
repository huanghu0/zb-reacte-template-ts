import { setActiveMenu } from '@/store/permission/permissionSlice';
import type { AppDispatch } from '@/store/index';

export const deepMenuList = (menuList:any) => {
  let _menuList = []
  for(let i = 0;i < menuList.length;i++){
    _menuList.push({})
  }
  const deepMenu = (menu:any,_menu:any) => {
    _menu.key = menu.menuUrl
    _menu.label = menu.menuName
    if(!menu.children || menu.children.length === 0) {
      return
    }else{
      _menu.children = []
      for(let i = 0;i < menu.children.length;i++){
        _menu.children.push({})
      }      
    }
    for(let i = 0;i < menu.children.length;i++){
      deepMenu(menu.children[i],_menu.children[i])
    }
  }
  for(let i = 0;i < menuList.length;i++){
    deepMenu(menuList[i],_menuList[i])
  }
  return _menuList
} 

export const checkPms = (url:string,menu:any,dispatch:AppDispatch) => {
  const ignoreList = [
    '/error',
    '/401',
    '/404',
    '/page/public/report/preview',
    '/page/public/report/tabluea',
    '/page/report/tabluea'
  ]
  if (ignoreList.includes(url)) {
    return true
  }    
  let temp:any = []
  menu.forEach((m:any) => {
    m.children.forEach((v:any) => {
      if (v.menuUrl === url) {
        temp.push(v)
      }
    })
  })
  if (temp.length === 1) {
    dispatch(setActiveMenu({
      activeMenu:temp[0]
    }))
    return true
  }
  return false
}


export const checkUrl = (url:string,module:any,page:any) => {
  let urlList:any = []
  let flag = false
  module.forEach((m:any) => {
    if (m.moduleUrl && !urlList.includes(m.moduleUrl)) {
      urlList.push(m.moduleUrl)
    }
  })
  page.forEach((p:any) => {
    if (!urlList.includes(p.pageUrl)) {
      urlList.push(p.pageUrl)
    }
  })   
  if (urlList.includes(url)) {
    flag = true
  }
  return flag     
}

// 获取权限的第一个页面地址
export const getFirstUrl = (moduleObj:any,menu:any,dispatch:AppDispatch) => {
  // 找到模块下面第一个菜单
  let temp:any = []
  menu.forEach((v:any) => {
    if (v.moduleId === moduleObj.oid) {
      temp.push(v)
    }
  })
  // 没有菜单，则取moduleUrl
  if (temp.length === 0) {
    dispatch(setActiveMenu({
      activeMenu:{
        ...moduleObj, moduleId: moduleObj.oid
      }
    }))      
    return moduleObj.moduleUrl
  }
  // 跳到菜单第一个页面
  dispatch(setActiveMenu({
    activeMenu: temp?.[0]?.children?.[0] || {}
  }))
  return temp?.[0]?.children[0]?.menuUrl || ''
}  