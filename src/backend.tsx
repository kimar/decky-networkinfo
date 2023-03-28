import { ServerAPI } from "decky-frontend-lib";
import { INetworkInfo } from "./models/INetworkInfo";

export class Backend {
  private serverAPI: ServerAPI;

  constructor(serverAPI: ServerAPI) {
    this.serverAPI = serverAPI;
  }

  async getNetworkInfo(): Promise<INetworkInfo[]> {
    const result = (await this.serverAPI.callPluginMethod("get_ip_address", {}))
      .result as string;
    return JSON.parse(result);
  }
}
