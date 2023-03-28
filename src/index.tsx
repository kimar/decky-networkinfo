import {
  definePlugin,
  Field,
  PanelSectionRow,
  ServerAPI,
  Spinner,
  staticClasses,
} from "decky-frontend-lib";
import { useEffect, useState, VFC } from "react";
import { FaNetworkWired } from "react-icons/fa";

import { Backend } from "./backend";
import { DevicesList } from "./components/DevicesList";
import { INetworkInfo } from "./models/INetworkInfo";

let pollTimerRef: NodeJS.Timeout | undefined; // reference for time for cleanup purposes

const Content: VFC<{ backend: Backend }> = ({ backend }) => {
  const [networkInfo, setNetworkInfo] = useState<INetworkInfo[] | null>(null);

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
    <div>
      {networkInfo == null && (
        <PanelSectionRow>
          <Field label="Loading…">
            <Spinner />
          </Field>
        </PanelSectionRow>
      )}
      {networkInfo && <DevicesList networkInfo={networkInfo} />}
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  const backend = new Backend(serverApi);

  return {
    title: <div className={staticClasses.Title}>Network Info</div>,
    content: <Content backend={backend} />,
    icon: <FaNetworkWired />,
    onDismount() {
      if (pollTimerRef) {
        clearTimeout(pollTimerRef);
      }
    },
  };
});
