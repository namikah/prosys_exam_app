import { BaseApiURL } from "../Config";
import { HttpClient } from "../HttpClient";

class LessonService extends HttpClient {
  constructor() {
    super(`${BaseApiURL}`);
  }

  async getData() {
    return await this.get("lesson/get");
  }

  async addData(lesson) {
    return await this.post("lesson/add", lesson);
  }

  async updateData(lesson) {
    return await this.put("lesson/update", lesson);
  }

  async removeData(lesson) {
    return await this.delete("lesson/delete", lesson);
  }
}

export const lessonService = new LessonService();
