import { useState, useRef, useEffect } from "react";
import { Tab, Nav, TabPane } from "react-bootstrap";
import { useTheme } from "../contexts/ThemesProvider";
import Modal from "./Modal";
import Calls from "./Calls";

const CONVERSATION_KEY = "conversation";
const CONTACTS_KEY = "contacts";
const CALLS_KEY = "calls";

type SidebarProps = {
  id: string;
  children: React.ReactNode;
  Conversations: React.ComponentType;
  Contacts: React.ComponentType;
};
const Sidebar = ({ id, Conversations, Contacts, children }: SidebarProps) => {
  const navLinkRef = useRef<HTMLAnchorElement>(null!);
  const offCanvas = children;
  useEffect(() => {
    if (navLinkRef.current) {
      navLinkRef.current.click();
    }
  }, []);
  console.log("Sidebar");
  let { theme } = useTheme();
  let [activeKey, setActiveKey] = useState<null | string>(CONVERSATION_KEY);
  const isConversationsOpen = activeKey === CONVERSATION_KEY;
  return (
    <div className="slideBar d-flex flex-column border border-right rounded">
      <Tab.Container onSelect={setActiveKey}>
        <Nav variant="tabs" className="list-nav" justify>
          <Nav.Item>
            <Nav.Link
              ref={navLinkRef}
              className={`${
                activeKey === CONVERSATION_KEY
                  ? `bg-${theme} border-${theme} text-light`
                  : " text-dark"
              }`}
              eventKey={CONVERSATION_KEY}
            >
              Conversation
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${
                activeKey !== CONVERSATION_KEY && activeKey !== CALLS_KEY
                  ? `bg-${theme} border-${theme} text-light`
                  : " text-dark"
              }`}
              eventKey={CONTACTS_KEY}
            >
              Contacts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${
                activeKey !== CONVERSATION_KEY && activeKey !== CONTACTS_KEY
                  ? `bg-${theme} border-${theme} text-light`
                  : " text-dark"
              }`}
              eventKey={CALLS_KEY}
            >
              Calls
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <TabPane eventKey={CONVERSATION_KEY}>
            {activeKey === CONVERSATION_KEY && <Conversations />}
          </TabPane>
          <TabPane eventKey={CONTACTS_KEY}>
            {activeKey === CONTACTS_KEY && <Contacts />}
          </TabPane>
          <TabPane eventKey={CALLS_KEY}>
            <Calls />
          </TabPane>
        </Tab.Content>
      </Tab.Container>
      <div className="m-4">{offCanvas}</div>
      <div className="p-2 border-top border-right small">
        Your ID : <span className="text-muted">{id}</span>
      </div>
      <Modal isConversationsOpen={isConversationsOpen} />
    </div>
  );
};

export default Sidebar;
