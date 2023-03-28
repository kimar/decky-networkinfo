import { Field, PanelSectionRow } from "decky-frontend-lib";
import { INetworkInfo } from "../models/INetworkInfo";

export function DeviceDetails({
  info,
  detailsShown,
}: {
  info: INetworkInfo;
  detailsShown: boolean;
}) {
  return (
    <div>
      <h4>{info.ifname}</h4>
      {info.addr_info.length === 0 && (
        <PanelSectionRow>Device not connected.</PanelSectionRow>
      )}
      {info.addr_info.map((addr_info) => {
        return (
          <PanelSectionRow>
            <Field
              label={`Address (${addr_info.family})`}
              bottomSeparator="none"
            >
              {addr_info.local}
            </Field>
            <Field label="Scope">{addr_info.scope}</Field>
            <Field label="Prefix Length">{addr_info.prefixlen}</Field>
            {detailsShown && addr_info.broadcast && (
              <Field label="Broadcast">{addr_info.broadcast}</Field>
            )}
          </PanelSectionRow>
        );
      })}
      {detailsShown && (
        <div>
          <PanelSectionRow>
            <Field label="Broadcast">{info.broadcast}</Field>
          </PanelSectionRow>
          <PanelSectionRow>
            <Field label="Link type">{info.link_type}</Field>
          </PanelSectionRow>
        </div>
      )}
    </div>
  );
}
