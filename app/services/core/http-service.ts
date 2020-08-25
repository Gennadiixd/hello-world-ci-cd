import axios from "axios";
import { isServer } from "@/utils";

export default class HttpService {
  options: any;
  constructor(options) {
    const { get, post, delete: deleteRequest } = axios.create({
      baseURL: isServer() ? process.env.API_BASE : "api/",
      responseType: "json",
    });

    this.options = options;
    this.post = post;
    this.get = get;
    this.delete = deleteRequest;
  }

  async get(endpoint, options = {}): Promise<{ data: any }> {
    return this.get(endpoint, options);
  }

  async post(endpoint, data = {}, options = {}) {
    return this.post(endpoint, data, options);
  }

  async delete(endpoint, options = {}) {
    return this.delete(endpoint, options);
  }
}
