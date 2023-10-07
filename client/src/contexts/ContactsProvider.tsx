import React, { useCallback, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";
import { TypeContacts } from "../common.types";

type ContactsContextProviderProps = {
  children: React.ReactNode;
};

type ContactsContextValueType = {
  contacts: TypeContacts;
  online_clients: string[];
  unknown_contacts: string[];
  createContact: (params: { id: string; name: string }) => void;
  deleteContact: (id: string) => void;
};
let ContactsContext = React.createContext({} as ContactsContextValueType);

export function useContacts() {
  return useContext(ContactsContext);
}
export function ContactsProvider({ children }: ContactsContextProviderProps) {
  console.log("ContactsProvider");
  let { connectedClients, id: my_id } = useSocket();
  let online_clients = connectedClients.filter(
    (clieny_id) => clieny_id !== my_id
  );
  let [contacts, setContacts] = useLocalStorage<TypeContacts>("contacts", []);
  const createContact = useCallback(
    ({ id, name }: { id: string; name: string }) => {
      setContacts((prevContacts: TypeContacts) => [
        ...prevContacts,
        { id, name },
      ]);
    },
    [setContacts]
  );

  const deleteContact = useCallback(
    (id: string) => {
      console.log("deleteContact", id);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    },
    [setContacts]
  );

  console.log("render Contacts Provider");

  const new_contacts_fun = () => {
    let unknown_contacts: string[] = [];
    console.log("contacts", contacts);
    const contactsIdsArray = contacts.map(
      (obj: { id: string; name: string }) => obj.id
    );
    connectedClients.map((client_id) => {
      if (my_id !== client_id && !contactsIdsArray.includes(client_id))
        unknown_contacts.push(client_id);
      return client_id;
    });
    return unknown_contacts;
  };
  const unknown_contacts = new_contacts_fun();
  let value: ContactsContextValueType = {
    contacts,
    online_clients,
    createContact,
    unknown_contacts,
    deleteContact,
  };
  console.log("hereee", value, unknown_contacts);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
