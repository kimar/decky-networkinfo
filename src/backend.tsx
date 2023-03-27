import { ServerAPI } from 'decky-frontend-lib';

export interface IAddrInfo {
  family: string
  local: string
  prefixlen: number
  scope: string
  label: string | undefined | null
}

export interface INetworkInfo {
  ifindex: number
  ifname: string
  flags: string[]
  mtu: number
  qdisc: string
  operstate: string
  group: string
  txqlen: number
  link_type: string
  address: string
  broadcast: string
  addr_info: IAddrInfo[]
}

export class Backend {
  private serverAPI: ServerAPI;

  constructor(serverAPI: ServerAPI) {
    this.serverAPI = serverAPI
  }

  async getNetworkInfo(): Promise<INetworkInfo[]> {
    const result = (await this.serverAPI.callPluginMethod('get_ip_address', {})).result as string
    return JSON.parse(result);
  }
}