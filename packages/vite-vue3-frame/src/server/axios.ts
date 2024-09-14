/* eslint-disable */
import axios from "axios";
import store from "@/store";
import DOMAIN_NAME from "./config";
/*
 * 请求拦截器
 */
axios.interceptors.request.use(
  (config: any) => {
    // 更改mock数据url
    const mockPath = store.getters["common/getMockPath"];
    mockPath.map((item: any) => {
      if (item.url == config.url) {
        config.baseURL = "";
      }
    });

    return config;
  },
  (error) => {
    // 预处理请求异常时抛出error
    return Promise.reject(error);
  }
);

/*
 * 响应拦截器
 */
axios.interceptors.response.use(
  (res: any) => {
    // 进行响应事件处理
    if (!res) {
      Promise.reject("服务异常");
    }
    const { data, status, statusText } = res;
    if (!data) {
      res.msg ? Promise.reject(res.msg) : Promise.reject("服务异常");
    } else if (data && status === 200) {
      return res.data.data;
    } else {
      Promise.reject(statusText);
    }
  },
  (error) => {
    try {
      if (typeof error == "string") {
        return error;
      }

      const {
        response: { status, statusText, data = {} },
      } = error;

      switch (status) {
        // 未登录
        case 401: {
          window.sessionStorage.clear();
          return Promise.reject({ code: status, msg: "登录过期" });
        }
        case 403:
          return Promise.reject({ code: status, msg: "服务器拒绝请求" });
        case 404:
          return Promise.reject({
            code: status,
            msg: "访问异常，请联系系统管理员",
          });
        case 500:
          return Promise.reject({ code: status, msg: "服务器内部错误" });
        case 503:
          return Promise.reject({ code: status, msg: "服务不可用" });
        default:
          return data.message || statusText;
      }
    } catch (e) {
      console.log("请求异常：", e);
    }
  }
);

/**
 * 返回axios方法
 * @param url（如果传绝对地址则baseURL不会追加到url之前）
 * @param method
 * @param timeout
 * @param data
 * @param headers
 * @param dataType
 * @returns {AxiosPromise}
 */
export default function(
  url: any,
  {
    // 基础路径
    baseURL = '/api/',
    // 默认求情方式post
    method = "post",
    // 超时
    timeout = 16000,
    // 请求主体
    data = {},
    // 请求参数
    params = {},
    // 请求头
    headers = {
      "Content-Type": DOMAIN_NAME.REQUEST_HEADER.application,
    },
    // 文件类型
    dataType = "json",
    // 上传进度
    onUploadProgress = {},
  }
) {
  const config: any = {
    method: method,
    timeout: timeout,
    url: url,
    baseURL: baseURL,
    data: data,
    params: params,
    headers: headers,
    dataType: dataType,
    async: true,
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    onUploadProgress: onUploadProgress, // 上传进度
  };
  return axios(config);
}
