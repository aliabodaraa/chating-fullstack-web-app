import { Dropdown, ListGroup, Modal, Spinner } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useCallback, useRef, useState, memo } from "react";
import NewUnknownContact from "./NewUnknownContact";

const NewUnknownContactMemo = memo(NewUnknownContact);

const Contacts = () => {
  console.log("Contacts");
  let { contacts, online_clients, unknown_contacts, deleteContact } =
    useContacts();
  let unknown_contact_index = useRef<number | undefined>(undefined);
  let [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const shortcutId = (id: string) => {
    return id.substring(0, 15) + "...";
  };
  return (
    <>
      <h5 className="text-center my-3 br-danger">My Contacts</h5>
      {contacts.length > 0 && (
        <ListGroup variant="flush">
          {contacts.map((contact, index) => (
            <ListGroup.Item key={index} className="row d-flex p-0 m-0 ">
              <ListGroup.Item className="col-lg-9 col-md-9 col-sm-9 bg-light border-0 d-flex">
                {contact.name}
              </ListGroup.Item>
              <ListGroup.Item className="col-lg-3 col-md-3 col-sm-3 p-1 bg-light border-0 d-flex">
                {online_clients.includes(contact.id) && (
                  <Spinner
                    animation="grow"
                    variant="success"
                    size="sm"
                    className="mt-2 me-1"
                  />
                )}
                <Dropdown className="d-inline mt-1 ms-1">
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    size="sm"
                    className="border-0 text-dark bg-light m-0"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => deleteContact(contact.id)}>
                      delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {contacts.length === 0 && (
        <h6 className="bg-danger text-center py-2 px-1 m-1">
          There are not any contacts
        </h6>
      )}
      {unknown_contacts.length > 0 && (
        <>
          <h5 className="text-center my-3">Online UnKnown Contacts</h5>
          <ListGroup variant="flush">
            {unknown_contacts.map((client_id, index) => (
              <ListGroup.Item key={index} className="row d-flex">
                <ListGroup.Item className="col-lg-9 col-md-9 col-sm-9 bg-light border-0">
                  {shortcutId(client_id)}
                </ListGroup.Item>
                <ListGroup.Item className="col-lg-3 col-md-3 col-sm-3 p-1 bg-light border-0 d-flex">
                  <Spinner
                    animation="grow"
                    variant="success"
                    size="sm"
                    className="mt-2 me-1"
                  />
                  <Dropdown className="d-inline mt-1 ms-1">
                    <Dropdown.Toggle
                      id="dropdown-autoclose-true"
                      size="sm"
                      className="border-0 text-dark bg-light m-0"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          unknown_contact_index.current = index;
                          setModalOpen(true);
                        }}
                      >
                        add
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ListGroup.Item>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      {unknown_contact_index.current !== undefined && //check if it is not undefined
        unknown_contacts[unknown_contact_index.current] && (
          <Modal show={modalOpen} onHide={closeModal}>
            <NewUnknownContactMemo
              closeModal={closeModal}
              client_id={unknown_contacts[unknown_contact_index?.current]}
            />
          </Modal>
        )}
    </>
  );
};

export default Contacts;
