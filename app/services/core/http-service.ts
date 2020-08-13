import axios from "axios";
import { isServer } from "@/utils";

export default class HttpService {
  options: any;
  constructor(options) {
    const { get, post } = axios.create({
      baseURL: isServer() ? process.env.API_BASE : "api/",
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
