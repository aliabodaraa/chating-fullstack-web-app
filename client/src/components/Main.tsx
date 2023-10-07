import Dashboard from "./Dashboard";
import SpinnerSocketConnection from "./SpinnerSocketConnection";
import { useSocket } from "../contexts/SocketProvider";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Sidebar from "./Sidebar";
import MainInterface from "./MainInterface";
import OffCanvasSettings from "./OffCanvasSettings";
import NavBar from "./NavBar";
export default function Main() {
  let { connectionStatus, id } = useSocket();
  console.log("Main", connectionStatus.connected);

  return (
    <>
      {connectionStatus.connected && (
        <>
          <NavBar />
          <Dashboard>
            <Sidebar id={id} Conversations={Conversations} Contacts={Contacts}>
              <OffCanvasSettings />
            </Sidebar>
            <MainInterface />
          </Dashboard>
        </>
      )}
      {!connectionStatus.connected && (
        <SpinnerSocketConnection connectionStatus={connectionStatus} />
      )}
    </>
  );
}
