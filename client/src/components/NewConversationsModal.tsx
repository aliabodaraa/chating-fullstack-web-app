import { useEffect, useRef, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import { useTheme } from "../contexts/ThemesProvider";
import { v4 as uuidV4 } from "uuid";
import { FormEvent } from "react";
import { TypeContacts } from "../common.types";
type PropsConversation = {
  closeModal: Function;
};
type TypeHandleCheckBoxChange = (str_contact_id: string) => void;
type TypeHandleSubmit = (e: FormEvent<HTMLFormElement>) => void;
const NewConversationsModal: React.FC<PropsConversation> = ({ closeModal }) => {
  console.log("NewConversationsModal");
  let { theme } = useTheme();
  let { contacts }: { contacts: TypeContacts } = useContacts();
  let { createConversation } = useConversations();
  let [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  let handleCheckBoxChange: TypeHandleCheckBoxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId))
        //why this if here the
        return prevSelectedContactIds.filter((prevId) => prevId !== contactId);
      else return [...prevSelectedContactIds, contactId];
    });
  };
  const isAtLeastOneCheckboxChecked = () => {
    return selectedContactIds.length >= 1;
  };
  // const errorCheckboxRef = useRef();
  const handleSubmit: TypeHandleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedContactIds);
    if (!isAtLeastOneCheckboxChecked()) {
      alert("Please check at least one checkbox");
      return;
    }
    createConversation(
      `conversation-${uuidV4()}`,
      nameRef.current.value,
      selectedContactIds
    );
    closeModal();
  };

  return (
    <>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={nameRef} required></Form.Control>
          <Form.Label>Members</Form.Label>
          {contacts.length > 0 &&
            contacts.map((contact) => (
              <Form.Group
                controlId={contact.id}
                key={contact.id}
                // label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
              >
                <Form.Check
                  type="checkbox"
                  label={contact.name}
                  checked={selectedContactIds.includes(contact.id)}
                ></Form.Check>
              </Form.Group>
            ))}
          {contacts.length == 0 && (
            <b>
              <br />
              There is no members
              <br />
              <br />
            </b>
          )}
          <Button type="submit" className={`border-0 bg-${theme}`}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationsModal;
