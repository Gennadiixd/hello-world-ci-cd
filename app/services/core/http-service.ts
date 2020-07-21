import axios from "axios";

const { get, post } = axios.create({
  baseURL: "api/",
  responseType: "json",
});

export default class HttpService {
  options: any;
  constructor(options) {
    this.options = options;
  }

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return get(endpoint, options);
  }

  async post(endpoint, data = {}, options = {}) {
    return post(endpoint, data, options);
  }
}
