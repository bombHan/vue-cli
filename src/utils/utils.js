
import that from '../main'
//下载链接地址图片
function downloadByBlob(url, name) {
  let image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = url
  image.onload = () => {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob)
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = url
      eleLink.click()
      eleLink.remove()
      // 用完释放URL对象
      URL.revokeObjectURL(url)
    })
  }
}

//复制字符串
function copyString(str) {
  const input = document.createElement("input");
  input.value = str;
  input.readOnly = true;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand("Copy");
  document.body.removeChild(input);
  that.$message.success("复制成功");
}

// 将对象转换成url后可带的参数字符串
function objecToQueryString(obj) {
  const keyArr = Object.keys(obj);
  let str = '?';
  keyArr.forEach((item) => {
    if (obj[item] != null) {
      str += `${item}=${obj[item]}&`
    }
  })
  return str
}

/* 深拷贝 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}



function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 防抖动debounce
function _debounce(fn, delay) {
  delay = delay || 600
  let timer
  return function () {
    let ctx = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(ctx, args)
    }, delay)
  }
}

import axios from 'axios';
function exportExcel(url, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
    axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    axios({
      method: 'post',
      url: url, // 请求地址
      data: options, // 参数
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data)
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        console.log(blob, response)
        let fileName = response.headers['content-disposition'] ? response.headers['content-disposition'] : Date.parse(new Date()) + '.xlsx'
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName)
        } else {
          // console.log(3)
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

// 将图片转成base64
function drawBase64Image (img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}

//根据sku算法获取skulist， sku方法入参不能传数组要用...解构
function getSkuList(arr) { // 传入[[1,2,3], [4,5],[6]], 返回[[1, 4, 6],[1, 5, 6],[2, 4, 6],[2, 5, 6],[3, 4, 6],[3, 5, 6]]
  const res = sku(...arr);
  return res;
}

// sku算法
function sku() {
  return Array.prototype.reduce.call(arguments, (a,b)=>{
      let res = [];
      a.forEach((item) => {
          b.forEach((item1) => {
              res.push(item.concat([item1]))
          })
      });
      return res;
  },[[]])
}

// 判断相等
function equal(a,b) {
  let aType = typeof a;
  let bType = typeof b;
  let flag = true;
  if(aType !== bType){
    flag = false;
  } else {
    if (typeof(a) === 'object') {
      for(let i in a) {
        console.log(a[i], b[i])
        if(typeof(a[i]) === 'object') {
          if(!equal(a[i],b[i])) {
            flag = false;
          }
        } else {
          if(a[i] !==b[i]) {
            flag = false;
          }
        }
      }
    } else {
      flag = a === b
    }
  }
  return flag;
}

let utils = {
  objecToQueryString,
  deepClone,
  getQueryObject,
  _debounce,
  exportExcel,
  downloadByBlob,
  copyString,
  drawBase64Image,
  getSkuList,
  sku,
  equal,
}

export default utils;