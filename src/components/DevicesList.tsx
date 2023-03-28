import {
  ButtonItem,
  Focusable,
  PanelSection,
  PanelSectionRow,
} from "decky-frontend-lib";
import { useState } from "react";
import { INetworkInfo } from "../models/INetworkInfo";
import { DeviceDetails } from "./DeviceDetails";

export function DevicesList({ networkInfo }: { networkInfo: INetworkInfo[] }) {
  const [detailsShown, setDetailsShown] = useState<boolean>(false);

  return (
    <Focusable style={{ minWidth: "100%", minHeight: "100%" }}>
      <PanelSection title="Devices">
        {networkInfo && networkInfo.length === 0 && (
          <PanelSectionRow>No Network Devices found.</PanelSectionRow>
        )}
        {networkInfo && networkInfo.length > 0 && (
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={() => {
                setDetailsShown(!detailsShown);
              }}
            >
              {detailsShown ? "Hide" : "Show"} more Details
            </ButtonItem>
          </PanelSectionRow>
        )}
        {networkInfo &&
          networkInfo.map((info) => {
            return <DeviceDetails info={info} detailsShown={detailsShown} />;
          })}
      </PanelSection>
    </Focusable>
  );
}
