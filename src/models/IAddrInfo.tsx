export interface IAddrInfo {
  family: string;
  local: string;
  prefixlen: number;
  broadcast: string | undefined | null;
  scope: string;
  label: string | undefined | null;
}
