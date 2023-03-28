import { IAddrInfo } from "./IAddrInfo"

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