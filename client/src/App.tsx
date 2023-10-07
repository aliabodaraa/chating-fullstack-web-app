import { ReactNode } from "react";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import { ThemesProvider } from "./contexts/ThemesProvider";
import useLocalStorage from "./hooks/useLocalStorage";
type TT = ReactNode;
function App() {
  const [id, setId] = useLocalStorage<string>("id", "");
  const dashboard: TT = (
    <SocketProvider id={id}>
      <ThemesProvider>
        <ContactsProvider>
          <ConversationsProvider>
            <Main />
          </ConversationsProvider>
        </ContactsProvider>
      </ThemesProvider>
    </SocketProvider>
  );
  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
