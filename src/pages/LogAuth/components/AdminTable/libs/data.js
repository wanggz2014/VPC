import HttpRequest from './axios';
import Qs from 'qs'
import Cookies from 'js-cookie';


const axios = new HttpRequest();
//如果想本地调试，将local设置为true


/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} d 传入的时间
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (d, startType) => {
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}


const dataCheck=(data)=>{
  for(const attr in data){
    if(data[attr] instanceof Date){
      const date=data[attr];
      data[attr]=getDate(date,'year');
    }
  }
  return data;
}


export const getTableData = ({requestParams,requestUrl,local}) => {
  console.log(requestUrl)
  console.log(requestParams)
  console.log(local)
  if(local){
    return new Promise(function (resolve) {
      const result={
        status:200,
        data:{
          success:true,
          message:'',
          details:[
            {
              name:'test',
              email:'wgz@163.com',
              createTime:'2019-12-01'
            }
          ]
        }
      }
      resolve(result);
    }); 
  }
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}


export const addTableData = ({requestParams,requestUrl}) => {
  console.log(requestUrl)
  requestParams=dataCheck(requestParams);
  console.log(requestParams)
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}


export const delTableData = ({requestParams,requestUrl,local}) => {
  console.log(requestUrl)
  console.log(requestParams)
  if(local){
    return new Promise(function (resolve) {
      const result={
        success:true
      }
      resolve(result);
    }); 
  }
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}


export const editTableData = ({requestParams,requestUrl,local}) => {
  console.log(requestUrl)
  requestParams=dataCheck(requestParams);
  console.log(requestParams)
  if(local){
    return new Promise(function (resolve) {
      const result={
        success:true
      }
      resolve(result);
    }); 
  }
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}

export const getTableMeta = ({requestParams,requestUrl,local}) => {
  console.log(requestUrl)
  console.log(requestParams)
  if(local){
    return new Promise(function (resolve, reject) {
      const result={
        status:200,
        data:{
          success:true,
          message:'',
          details:[
            { title: 'Email', key: 'email', editable: true },
            { title: 'Name', key: 'name', editable: true },
            { title: 'Create-Time', key: 'createTime' }
          ]
        }
      }
      resolve(result);
    }); 
  }
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}

export const getFormMeta = ({requestUrl,requestParams}) => {
  console.log(requestUrl)
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}

export const responseHandle=(res,message,handle)=>{
  if(res.status!=200){
    console.log(res);
    message.error("数据请求出错，请核对");
    return false;
  }
  const response=res.data;
  console.log(response)
  if(response.code!=200||response.data==null){
    message.error(response.message);
    return false;
  }
  if(handle!=undefined){
    return handle(response.data);
  }
  return true;
}

export const initParam=(params,data)=>{
  const currrentParam=params==undefined?{}:params;
  currrentParam.token= data.token==undefined?Cookies.get('token'):data.token
  return currrentParam
}



