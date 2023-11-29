import { BaseApiURL } from "../Config";
import { HttpClient } from "../HttpClient";

class ExamService extends HttpClient {
  constructor() {
    super(`${BaseApiURL}`);
  }

  async getData() {
    return await this.get("exam/get");
  }

  async addData(exam) {
    return await this.post("exam/add", exam);
  }

  async updateData(exam) {
    return await this.put("exam/update", exam);
  }

  async removeData(exam) {
    return await this.delete("exam/delete", exam);
  }
}

export const examService = new ExamService();
