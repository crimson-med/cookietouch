import axios from "axios";

export default class DTConstants {
  public static readonly MAIN_URL = "https://proxyconnection.touch.dofus.com";
  public static appVersion: string;
  public static buildVersion: string;
  public static assetsVersion: string;
  public static staticDataVersion: string;
  public static config: any;

  public static Init() {
    DTConstants.getConfig().then((data) => {
      this.config = data;
    });
    DTConstants.getAssetsVersions().then((data) => {
      this.assetsVersion = data.assetVersion;
      this.staticDataVersion = data.staticDataVersion;
    });
    DTConstants.getAppVersion().then((data) => {
      this.appVersion = data;
    });
    DTConstants.getBuildVersion().then((data) => {
      this.buildVersion = data;
    });
  }

  public static getConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(`${DTConstants.MAIN_URL}/config.json`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error("Error in config loading ! (" + error.message + ")")));
    });
  }

  public static getAssetsVersions(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(`${DTConstants.MAIN_URL}/assetsVersions.json`)
        .then((response) => resolve(response.data));
    });
  }
  public static getAppVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.get("https://itunes.apple.com/lookup?id=1041406978")
        .then((response) => resolve(response.data.results[0].version));
    });
  }

  public static getBuildVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.get(`${DTConstants.MAIN_URL}/build/script.js`).then((response) => {
        const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
        const m = regex.exec(response.data.substring(1, 10000));
        resolve(m[2]);
      });
    });
  }
}
