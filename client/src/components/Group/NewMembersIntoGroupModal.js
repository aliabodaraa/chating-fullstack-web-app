import { useRef, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import { useTheme } from "../contexts/ThemesProvider";
const NewMembersIntoGroupModal = ({closeModal}) => {
    console.log("EditConversationModal")
    let {theme}=useTheme();
    let {contacts}=useContacts();
    let {createConversation} = useConversations();
    let [selectedContactIds, setSelectedContactIds]=useState([]);
    const nameRef = useRef();
    let handleCheckBoxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds=>{
            if(prevSelectedContactIds.includes(contactId))//why this if here the
                return prevSelectedContactIds.filter(prevId => prevId !== contactId);
            else
                return [...prevSelectedContactIds, contactId];
        })
    }
    const isAtLeastOneCheckboxChecked = () => {
        return selectedContactIds.length >= 1;
    }
    const errorCheckboxRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedContactIds)
        if (!isAtLeastOneCheckboxChecked()) {
            alert('Please check at least one checkbox');
            return;
          }
        createConversation(nameRef.current.value,selectedContactIds);
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
                        {contacts.map((contact) => 
                            <Form.Group
                                controlId={contact.id} 
                                key={contact.id} 
                                label={contact.name}
                                onChange={()=>handleCheckBoxChange(contact.id)} required>
                                <Form.Check type="checkbox" label={contact.name} value={selectedContactIds.includes(contact.id)}>
                                </Form.Check>
                            </Form.Group>
                        )}
                        <b ref={errorCheckboxRef}></b>
                    <Button type="submit" className={`border-0 bg-${theme}`}>Submit</Button>
                </Form>
            </Modal.Body>
        </>
    );
}
 
export default NewMembersIntoGroupModal;