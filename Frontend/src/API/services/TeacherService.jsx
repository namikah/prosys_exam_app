import { BaseApiURL } from "../Config";
import { HttpClient } from "../HttpClient";

class TeacherService extends HttpClient {
  constructor() {
    super(`${BaseApiURL}`);
  }

  async getData() {
    return await this.get("teacher/get");
  }

  async addData(teacher) {
    return await this.post("teacher/add", teacher);
  }

  async updateData(teacher) {
    return await this.put("teacher/update", teacher);
  }

  async removeData(props) {
    return await this.delete("teacher/delete/", props);
  }
}

export const teacherService = new TeacherService();
