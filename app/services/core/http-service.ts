import axios from "axios";

export default class HttpService {
  options: any;
  constructor(options) {
    this.options = options;
  }

  BASE_URL = "api";

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return axios.get(`${this.BASE_URL}/${endpoint}`, options);
  }

  getCookie(name) {
    console.log(document.cookie);
    
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  getToken() {
    return this.getCookie("token");
  }
}
