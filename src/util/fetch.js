import axios from 'axios';
import querystring from 'querystring';

export const stringifyParam = (url, data) => `${url}?${querystring.stringify(data)}`;

function getErrorMsgByStatusCode(code) {
  let result = '未知错误';
  if (code >= 400 && code < 500) {
    switch (code) {
      case 401:
        result = '您尚未登录，请登录后访问。';
        break;
      case 403:
        result = '您所请求的资源被禁止访问。';
        break;
      case 404:
        result = '您所请求的资源并不存在。';
        break;
      case 405:
        result = '非法请求被禁止。';
        break;
      default:
        result = `抱歉，程序出了问题(${code}).`;
    }
  } else if (code >= 500 && code < 600) {
    result = '服务器出错。';
  }
  return result;
}

function handleReqSuccess(resp) {
  // stantard scheme that every API should follow
  const {
    data: {
      code,
      data,
      msg,
    },
    request: {
      responseURL,
    },
  } = resp;

  // if code is not 0, then it is logic error in server
  if (code !== 0) {
    const logicError = new Error(`${msg}`);
    logicError.responseURL = responseURL;
    throw logicError;
  }

  return data;
}

function handleReqError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 304) {
      // skip for status code 304, cause language pack API relies on this to do cache
      return false;
    }
    // then this is definitely a status code error
    // Sentry.captureException(error);
    // get a semantic description for this error and throw to the top
    const errMsg = getErrorMsgByStatusCode(error.response.status);
    throw new Error(errMsg);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // this could be that the client is in slow network
    // Sentry.captureException(error);
    throw new Error('未能收到服务器返回的数据，您的网络环境可能出了问题。');
  } else {
    // Something happened in setting up the request that triggered an Error,
    // so this is definitely an error in our code
    // Sentry.captureException(error);
    // if (isDev()) {
    //   // eslint-disable-next-line no-console
    //   console.error(error);
    // }
    throw error;
  }
}

export function request(userConfig = {}) {
  const defaultConfig = {
    method: 'get',
    withCredentials: true,
  };
  const finalConfig = Object.assign({}, defaultConfig, userConfig);

  // language header
  const headers = finalConfig.headers || {};
  // if nobody set the language in config, use what we have in browser
  // if (!headers['Accept-Language']) {
  //   headers['Accept-Language'] = getLang();
  // }
  finalConfig.headers = headers;

  // const { url } = finalConfig;
  // add url prefix
  // if (/^\//.test(url)) {
  //   finalConfig.url = genPathWithPrefix(urlPrefix, url);
  // }
  return axios(finalConfig).then(handleReqSuccess, handleReqError);
}

export function quickRequest(userConfig = {}) {
  const {
    data = {},
    method = 'get',
    url,
    ...restProps
  } = userConfig;

  let finalConfig;
  if (method === 'get') {
    // format url with query string from data
    const urlGet = stringifyParam(url, data);

    finalConfig = {
      ...restProps,
      method,
      url: urlGet,
    };
  } else if (method === 'post') {
    let dataPost = data;
    if (!(dataPost instanceof FormData)) {
      // for data that is not FormData instance, we create one
      dataPost = new FormData();
      Object.keys(data).forEach((key) => {
        const val = data[key];
        dataPost.append(key, val);
      });
    }
    finalConfig = {
      ...restProps,
      data: dataPost,
      method,
      url,
    };
  }

  return request(finalConfig);
}

export default function minimalRequest(url, data) {
  if (typeof url === 'string') {
    // if url is a string
    return quickRequest({
      url,
      data,
    });
  }

  return quickRequest({
    ...url,
    data,
  });
}
