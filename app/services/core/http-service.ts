import axios from "axios";

export default class HttpService {
  options: any;
  constructor(options) {
    this.options = options;
  }

  BASE_URL = "http://api:3000";

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return axios.get(`${this.BASE_URL}/${endpoint}`, options);
  }
}
