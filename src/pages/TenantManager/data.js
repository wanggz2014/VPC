import axios from '@/libs/api.request'
import Qs from 'qs'
import Cookies from 'js-cookie';

const setToken=(params)=>{
  params.token= Cookies.get('token')
}

export const reset = ({requestParams,requestUrl}) => {
  console.log(requestUrl)
  setToken(requestParams)
  console.log(requestParams)
  return axios.request({
    url: requestUrl,
    method: 'post',
    data:Qs.stringify(requestParams)
  })
}

export const license=({requestParams,requestUrl}) => {
  console.log(requestUrl)
  setToken(requestParams)
  console.log(requestParams)
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





