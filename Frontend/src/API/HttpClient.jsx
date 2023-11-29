import axios from "axios";

export class HttpClient {
  dataUrl;

  constructor(url) {
    this.dataUrl = url;
  }

  async get(endpoint) {
    return await axios.get(`${this.dataUrl}/${endpoint}`);
  }
  async post(endpoint, props) {
    return await axios.post(`${this.dataUrl}/${endpoint}`, props);
  }
  async put(endpoint, props) {
    return await axios.put(`${this.dataUrl}/${endpoint}`, props);
  }
  async delete(endpoint, props) {
    return await axios.post(`${this.dataUrl}/${endpoint}`, props);
  }
}