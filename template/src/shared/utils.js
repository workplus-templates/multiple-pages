import SHA256 from 'crypto-js/sha256';

export const isWorkPlus = () => window.navigator.userAgent.toUpperCase().indexOf('WORKPLUS') > -1;
export const hasCordova = () => !!cordova;
export const fetchSuccess = (res) => res.status === FETCH_SUCCESS_STATUS;
export const goPage = (link) => window.location.href = link;

const isEmptyObject = (obj) => {
  let i = 0;
  for(let key in obj){
    ++i;
  }
  return i === 0 ? true : false;
}

export const request = (params) => new Promise((resolve, reject) => {
  // 添加时间戳
  var _date = new Date().getTime();
  params.path.indexOf('?') > -1 ? params.path += '&time=' + _date : params.path += '?time=' + _date;
  
  var signature = '';
  var _basePath = BASE_PATH;
  var defaults = {
    url: _basePath + params.path,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    timeout: 1000 * 30,
    headers: {},
  }
  
  //附加上默认的请求参数
  for (var p in params) {
    defaults[p] = params[p];
  }
  params = defaults; 

  if (['POST', 'DELETE', 'PUT', 'OPTIONS'].indexOf(params.type.toUpperCase()) > -1 && params.contentType && params.contentType.indexOf('json') != -1) {
    params.data = (params.data && !isEmptyObject(params.data)) ? JSON.stringify(params.data) : '';
    signature += params.data;
  }
  signature += params.path + "signature";
  params.headers["expire-day"] = SHA256(signature).toString(); // 设定加密字段 expire-day
  
  params.success = function(data, status, xhr) {
    if (typeof(data) === 'string') data = JSON.parse(data);
    resolve(data, status, xhr);
  };
  params.error = function(data,status,xhr) {
    var _errorMsg = '请求出错了，请重试！';
    reject(_errorMsg, status, xhr);
  };
  
  $.ajax(params);
});

export const fixImagesPath = (mediaId) => {
  if (mediaId) {
    return `${BASE_PATH}/images/${mediaId}`;
  }
  return null;
};