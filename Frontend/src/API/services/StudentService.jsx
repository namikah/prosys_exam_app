import { BaseApiURL } from "../Config";
import { HttpClient } from "../HttpClient";

class StudentService extends HttpClient {
  constructor() {
    super(`${BaseApiURL}`);
  }

  async getData() {
    return await this.get("student/get");
  }

  async addData(student) {
    return await this.post("student/add", student);
  }

  async updateData(student) {
    return await this.put("student/update", student);
  }

  async removeData(student) {
    return await this.delete("student/delete", student);
  }
}

export const studentService = new StudentService();
