import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useTheme } from "../contexts/ThemesProvider";
type NewUnknownContactPropsType = {
  closeModal: Function;
  client_id: string;
};
const NewUnknownContact = ({
  closeModal,
  client_id,
}: NewUnknownContactPropsType) => {
  console.log("NewUnknownContact");
  let { theme } = useTheme();
  console.log(client_id);
  const nameRef = useRef<HTMLInputElement>(null!);
  const { createContact } = useContacts();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Sdfsd");
    e.preventDefault();
    createContact({ id: client_id, name: nameRef.current.value });
    closeModal();
  };
  return (
    <>
      {client_id}
      <Modal.Header>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              value={client_id}
              required
              disabled
            ></Form.Control>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef}></Form.Control>
          </Form.Group>
          <Button type="submit" className={`border-0 bg-${theme}`}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewUnknownContact;
