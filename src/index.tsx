import {
  ButtonItem,
  definePlugin,
  Field,
  Focusable,
  Marquee,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  Spinner,
  staticClasses,
} from "decky-frontend-lib";
import { useEffect, useState, VFC } from "react";
import { FaWifi } from "react-icons/fa";

import { Backend, INetworkInfo } from "./backend";

let pollTimerRef: NodeJS.Timeout | undefined; // reference for time for cleanup purposes

const Content: VFC<{ backend: Backend }> = ({ backend }) => {
  const [networkInfo, setNetworkInfo] = useState<INetworkInfo[] | null>(null);
  const [detailsShown, setDetailsShown] = useState<boolean>(false);

  const refreshNetworkInfo = async () => {
    const info = await backend.getNetworkInfo();
    setNetworkInfo(info.filter((item) => item.ifname !== "lo")); // filter loopback device
  };

  const pollNetworkDevices = (delay: number | undefined) => {
    pollTimerRef = setTimeout(async () => {
      await refreshNetworkInfo();
      pollNetworkDevices(delay);
    }, delay);
  };

  useEffect(() => {
    pollNetworkDevices(500);
  }, []);

  return (
    <Focusable style={{ minWidth: "100%", minHeight: "100%" }}>
      <PanelSection title="Devices">
        {networkInfo == null && (
          <PanelSectionRow>
            <Field label="Loading…">
              <Spinner />
            </Field>
          </PanelSectionRow>
        )}
        {networkInfo && networkInfo.length === 0 && (
          <PanelSectionRow>No Network Devices found.</PanelSectionRow>
        )}
        {networkInfo &&
          networkInfo.map((info) => {
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
                        <Marquee>{addr_info.local}</Marquee>
                      </Field>
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
          })}
        {networkInfo && networkInfo.length > 0 && (
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={() => {
                setDetailsShown(!detailsShown);
              }}
            >
              {detailsShown ? "Hide" : "Show"} Details
            </ButtonItem>
          </PanelSectionRow>
        )}
      </PanelSection>
    </Focusable>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  const backend = new Backend(serverApi);

  return {
    title: <div className={staticClasses.Title}>Network Info</div>,
    content: <Content backend={backend} />,
    icon: <FaWifi />,
    onDismount() {
      if (pollTimerRef) {
        clearTimeout(pollTimerRef);
      }
    },
  };
});
