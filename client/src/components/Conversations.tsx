import { Dropdown, ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import { useTheme } from "../contexts/ThemesProvider";
import Badge from "react-bootstrap/Badge";

const Conversations = () => {
  console.log("Conversations");
  const {
    conversations,
    setKeyOfSelectedConversation,
    setUnreadMessagesCount,
    indexOfCurrentConversation,
    deleteConversation,
  } = useConversations();
  let { theme } = useTheme();
  return (
    <>
      <h4 className="text-center my-3"> My Conversations </h4>
      {conversations.length > 0 && (
        <>
          <ListGroup variant="flush" as="ol" numbered>
            {conversations.map((conversation) => (
              <ListGroup.Item
                as="li"
                className={`${
                  conversation.selected ? `bg-${theme}` : ""
                } border-0 d-flex justify-content-between align-items-start`}
                key={conversation.group_id}
                action
                onClick={() => {
                  setKeyOfSelectedConversation(conversation.group_id);
                  setUnreadMessagesCount(conversation.group_id);
                }}
                active={conversation.selected}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{conversation.name}</div>
                  {conversation.recipients
                    .map((recipient) => recipient.name)
                    .join(", ")}
                </div>
                {indexOfCurrentConversation !== conversation.group_id &&
                  conversation.unReadMessagesCount > 0 && (
                    <Badge bg={`${theme}`}>
                      {conversation.unReadMessagesCount}
                    </Badge>
                  )}
                {/* <Button onClick={()=>deleteConversation(index)}>delete</Button> */}
                <Dropdown className="d-inline mt-1 ms-1 p-0">
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    size="sm"
                    className={`border-0 bg-${theme} text-dark m-0`}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteConversation(conversation.group_id);
                      }}
                    >
                      delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      {conversations.length === 0 && (
        <h6 className={`bg-${theme} text-center py-2 px-1 m-2`}>
          There are not any conversations
        </h6>
      )}
    </>
  );
};

export default Conversations;
