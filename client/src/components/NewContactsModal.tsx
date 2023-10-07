import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useTheme } from "../contexts/ThemesProvider";

const NewContactsModal = ({ closeModal } = { closeModal: Function }) => {
  console.log("NewContactsModal");
  let { theme } = useTheme();
  const idRef = useRef<HTMLInputElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);
  const { createContact } = useContacts();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createContact({ id: idRef.current.value, name: nameRef.current.value });
    closeModal();
  };
  return (
    <>
      <Modal.Header>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit" className={`border-0 bg-${theme}`}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactsModal;
