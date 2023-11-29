import { BaseApiURL } from "../Config";
import { HttpClient } from "../HttpClient";

class GroupService extends HttpClient {
  constructor() {
    super(`${BaseApiURL}`);
  }

  async getData() {
    return await this.get("group/get");
  }

  async addData(group) {
    return await this.post("group/add", group);
  }

  async updateData(group) {
    return await this.put("group/update", group);
  }

  async removeData(group) {
    return await this.delete("group/delete", group);
  }
}

export const groupService = new GroupService();
