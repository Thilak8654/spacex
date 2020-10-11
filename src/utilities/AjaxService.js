import axios from "axios";

export const AjaxService = {
  get: (url, params, headers) => {
    return axios({
      method: "GET",
      url: url,
      headers: headers || { "content-type": "application/json" },
      params: params || {}
    });
  },
  post: (url, data, headers) => {
    return axios({
      method: "POST",
      url: url,
      headers: headers || { "content-type": "application/json" },
      data: data
    });
  }
};
