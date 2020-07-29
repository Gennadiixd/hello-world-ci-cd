import axios from "axios";

export default class HttpService {
  options: any;
  constructor(options) {
    const { get, post } = axios.create({
      baseURL: process.env.API_BASE,
      responseType: "json",
    });

    this.options = options;
    this.post = post;
    this.get = get;
  }

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return this.get(endpoint, options);
  }

  async post(endpoint, data = {}, options = {}) {
    return this.post(endpoint, data, options);
  }
}
