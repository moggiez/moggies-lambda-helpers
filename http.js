const axios = require("axios");

class HttpClient {
  constructor({ user, baseUrl }) {
    this.instance = null;
    this.setUser(user);
    this.setBaseUrl(baseUrl);
  }

  async initialize() {
    try {
      this.instance = axios.create({
        headers: {
          Authorization: this.user.authorization,
        },
      });
      Promise.resolve();
    } catch (e) {
      console.log(e);
      Promise.reject(e);
    }
  }

  setUser(user) {
    this.user = user;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _getFullUrl(url) {
    if (this.baseUrl) {
      return `${this.baseUrl}/${url}`;
    } else {
      return url;
    }
  }

  async get(url) {
    if (this.instance == null) {
      await this.initialize();
    }
    return await this.instance.get(this._getFullUrl(url));
  }

  async post(url, data) {
    if (this.instance == null) {
      await this.initialize();
    }
    return await this.instance.post(this._getFullUrl(url), data);
  }

  async put(url, data) {
    if (this.instance == null) {
      await this.initialize();
    }
    return await this.instance.put(this._getFullUrl(url), data);
  }

  async delete(url) {
    if (this.instance == null) {
      await this.initialize();
    }
    return this.instance.delete(this._getFullUrl(url));
  }
}

exports.HttpClient = HttpClient;
