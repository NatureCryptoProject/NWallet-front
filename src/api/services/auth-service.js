import $api from "../http";

export default class AuthService {
  static async login({ userName, password }) {
    return $api.post("/login", { userName, password });
  }

  static async registration({ userName, password }) {
    return $api.post("/registration", { userName, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
