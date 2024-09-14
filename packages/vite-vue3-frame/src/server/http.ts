import axios from "./axios";
import qs from "qs";

const request = {
  // post 请求
  post(path: string, data: any) {
    return axios(path, {
      // 请求方式
      method: "post",
      // 数据体
      data: data ? qs.stringify(data) : "",
    }).then(
      (res) => {
        return res;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  // get 请求
  get(path: string, params: any) {
    return axios(path, {
      method: "get",
      params: params,
    }).then(
      (res) => {
        return res;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  // put 请求
  put(path: string, data: any) {
    return axios(path, {
      method: "put",
      data: data ? qs.stringify(data) : "",
    }).then(
      (res) => {
        return res;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  // delete 请求
  del(path: string, data: any) {
    return axios(path, {
      method: "delete",
      data: data ? qs.stringify(data) : "",
    }).then(
      (res) => {
        return res;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  // formdata 上传文件
  requestFormData(path: string, data: string) {
    return axios(path, {
      method: "post",
      data: data,
      onUploadProgress: (progressEvent: any) => {
        console.log(progressEvent);
      },
    }).then(
      (res) => {
        return res;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

export default request;
