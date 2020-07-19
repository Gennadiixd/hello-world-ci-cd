import axios from "axios";

export default class HttpService {
  options: any;
  constructor(options) {
    this.options = options;
  }

  BASE_URL = "api";

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return axios.get(`${this.BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      ...options,
    });
  }

  async post(endpoint, data = {}, options = {}) {
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      ...options,
    });
  }

  getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : "";
  }

  getToken() {
    return this.getCookie("token");
  }
}
