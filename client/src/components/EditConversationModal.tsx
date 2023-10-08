import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Form, Modal, Button, Image } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useTheme } from "../contexts/ThemesProvider";

import { useConversations } from "../contexts/ConversationsProvider";
import { formattedConversationType } from "../contexts/ConversationsProvider";
import { TypeHandleSubmit } from "../common.types";
type EditConversationModalPropsType = {
  closeModal: Function;
};
const EditConversationModal = ({
  closeModal,
}: EditConversationModalPropsType) => {
  console.log("EditConversationModal");
  let { contacts } = useContacts();
  let { theme } = useTheme();
  let { editConversation, sendActionMessage, selectedConversation } =
    useConversations();
  const { recipients_ids, group_id, creator_id, name, image } =
    selectedConversation as formattedConversationType;
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(image);
  let [selectedContactIds, setSelectedContactIds] = useState(recipients_ids);
  const nameRef = useRef<HTMLInputElement>(null!);

  let handleCheckBoxChange = (contactId: string) => {
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
  const getNameFromPersonIdentifier = useCallback(
    (personId: string) => {
      const contact = contacts.find((contact) => contact.id === personId);
      const name = (contact && contact.name) || personId;
      return name;
    },
    [contacts]
  );

  const sendMessagesToGuestsAndDepartures = (prevContactIds: string[]) => {
    const departures = prevContactIds.filter(
      (contact_id) => !selectedContactIds.includes(contact_id)
    );
    const guests = selectedContactIds.filter(
      (contact_id) => !prevContactIds.includes(contact_id)
    );
    let mappingDeparturesNames = departures.map((departure) => {
      return getNameFromPersonIdentifier(departure);
    });
    if (mappingDeparturesNames.length > 0) {
      sendActionMessage(
        recipients_ids,
        "leave " + mappingDeparturesNames.join(","),
        group_id,
        creator_id,
        name,
        image,
        departures,
        guests
      );
    }
    let mappingGuestsNames = guests.map((guest) => {
      return getNameFromPersonIdentifier(guest);
    });
    if (mappingGuestsNames.length > 0) {
      //send ActionMessage to store it
      sendActionMessage(
        recipients_ids,
        "joined " + mappingGuestsNames.join(","),
        group_id,
        creator_id,
        name,
        image,
        departures,
        guests
      );
    }
  };

  const handleSubmit: TypeHandleSubmit = (e) => {
    e.preventDefault();
    // if (! isAtLeastOneCheckboxChecked()) {
    //     alert('Please check at least one checkbox');
    //     return;
    // }
    const image = selectedImage?.toString()!;
    editConversation(
      nameRef.current.value,
      selectedContactIds,
      creator_id,
      group_id,
      image
    );
    sendMessagesToGuestsAndDepartures(recipients_ids);
    closeModal();
  };

  const handleImageUpload = (event: BaseSyntheticEvent) => {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    console.log(event, file, reader);
  };

  return (
    <>
      <Modal.Header>Edit Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Group Image:</Form.Label>
          <br />
          <Image src={selectedImage} rounded width="100px" />
          <Form.Label style={{ position: "relative" }}>
            <svg
              style={{ position: "absolute", right: "81px", top: "-40px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
            <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: "contents" }}
            />
          </Form.Label>
          <br />
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            ref={nameRef}
            defaultValue={name}
            required
          ></Form.Control>
          <Form.Label>Members</Form.Label>
          {contacts.map((contact) => (
            <Form.Group
              controlId={contact.id}
              key={contact.id}
              onChange={() => handleCheckBoxChange(contact.id)}
            >
              <Form.Check
                type="checkbox"
                defaultChecked={selectedContactIds.includes(contact.id)}
                label={contact.name}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit" className={`border-0 bg-${theme}`}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default EditConversationModal;
