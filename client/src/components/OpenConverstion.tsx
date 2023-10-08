import React, { useState, useCallback, useRef } from "react";
import {
  Form,
  InputGroup,
  Button,
  CloseButton,
  Navbar,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import { useTheme } from "../contexts/ThemesProvider";
import EditConversationModal from "./EditConversationModal";
import Messages from "./Messages";
import { formattedConversationType } from "../contexts/ConversationsProvider";
import { ActionEnum } from "../contexts/ConversationsProvider";
import { TypeHandleSubmit } from "../common.types";
import { setRefToLastMessageFunType } from "../common.types";

const CurrentConversation = () => {
  console.log("CurrentConversation");
  const textRef = useRef<HTMLTextAreaElement>(null!);
  let { theme } = useTheme();
  const {
    id,
    sendMessage,
    joinOrLeaveConversation,
    selectedConversation,
    setKeyOfSelectedConversation,
  } = useConversations();
  const {
    recipients_ids,
    group_id,
    creator_id,
    name,
    status,
    recipients,
    messages,
    image: conversationImage,
  } = selectedConversation as formattedConversationType;

  let [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  // const lastMessageRef = useRef();

  const handleSubmit: TypeHandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage(
        recipients_ids,
        textRef.current.value,
        group_id,
        creator_id,
        name,
        conversationImage
      );
      textRef.current.value = "";
    },
    [recipients_ids, group_id, creator_id, name, sendMessage]
  );
  const setRefToLastMessage: setRefToLastMessageFunType = useCallback(
    (node) => {
      if (node) {
        //solution 2
        //lastMessageRef.current=node;
        node.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const join_or_leave_conversation = (type: ActionEnum) => {
    // sendActionMessage(
    //     recipients_ids,
    //     "text--Me",
    //     [id],
    //     [],
    //     group_id,
    //     creator_id,
    //     name
    // );
    joinOrLeaveConversation(recipients_ids, group_id, type); //while we not put id in recipients that means the user will leave the conversation
  };

  return (
    <div className="conversation w-100 position-relative d-flex">
      <Navbar
        expand="sm"
        className="conversation-header w-100 position-absolute top-1 p-0 end-0 bg-light"
      >
        <Col className="ps-2 d-flex">
          <Image src={conversationImage} thumbnail style={{ width: "60px" }} />
          <div className="ms-2 m-auto">
            <div className="fw-bold">{name}</div>
            {recipients.map((recipient) => recipient.name).join(", ")}
          </div>
        </Col>

        {/* {JSON.stringify(selectedConversation)} */}

        <div className="d-flex  position-absolute end-0">
          <div className="me-3">
            {status === "active" && (
              <Button
                className="disjoin-conversation p-0 me-3 mb-2"
                variant="link"
                onClick={() => join_or_leave_conversation(ActionEnum.LEAVE)}
              >
                <svg
                  fill="#000000"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>logout</title>{" "}
                    <path d="M0 9.875v12.219c0 1.125 0.469 2.125 1.219 2.906 0.75 0.75 1.719 1.156 2.844 1.156h6.125v-2.531h-6.125c-0.844 0-1.5-0.688-1.5-1.531v-12.219c0-0.844 0.656-1.5 1.5-1.5h6.125v-2.563h-6.125c-1.125 0-2.094 0.438-2.844 1.188-0.75 0.781-1.219 1.75-1.219 2.875zM6.719 13.563v4.875c0 0.563 0.5 1.031 1.063 1.031h5.656v3.844c0 0.344 0.188 0.625 0.5 0.781 0.125 0.031 0.25 0.031 0.313 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.344-0.281 0.313-0.844 0-1.156l-7.344-7.313c-0.438-0.469-1.375-0.188-1.375 0.563v3.875h-5.656c-0.563 0-1.063 0.469-1.063 1.031z"></path>{" "}
                  </g>
                </svg>
              </Button>
            )}
            {creator_id === id && status === "active" && (
              <Button
                className="edit-conversation p-0 me-3 mb-2"
                variant="link"
                onClick={() => setModalOpen(true)}
              >
                <svg
                  className="bi bi-pencil-square"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  color="#888"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </Button>
            )}
            {status === "out" && (
              <Button
                className="join-conversation p-0 me-3 mb-2"
                variant="link"
                onClick={() => join_or_leave_conversation(ActionEnum.JOIN)}
              >
                <svg
                  fill="#000000"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>login</title>{" "}
                    <path d="M12.219 26.156h6.094c1.156 0 2.125-0.406 2.875-1.188 0.75-0.75 1.219-1.75 1.219-2.875v-12.219c0-1.125-0.469-2.125-1.219-2.875s-1.75-1.188-2.875-1.188h-6.094v2.563h6.094c0.875 0 1.531 0.656 1.531 1.5v12.219c0 0.844-0.656 1.531-1.531 1.531h-6.094v2.531zM0 13.563v4.875c0 0.563 0.469 1.031 1.031 1.031h5.688v3.844c0 0.344 0.156 0.625 0.469 0.781 0.125 0.031 0.281 0.031 0.344 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.281-0.281 0.25-0.844 0-1.156l-7.344-7.313c-0.25-0.25-0.563-0.281-0.906-0.188-0.313 0.156-0.469 0.406-0.469 0.75v3.875h-5.688c-0.563 0-1.031 0.469-1.031 1.031z"></path>{" "}
                  </g>
                </svg>
              </Button>
            )}
            <CloseButton
              onClick={() => setKeyOfSelectedConversation(null)}
              aria-label="Hide"
            />
          </div>
        </div>
      </Navbar>
      <div
        className="conversation-content d-flex flex-column flex-grow-1 bg-light"
        style={{ paddingTop: "61px" }}
      >
        <div className="flex-grow-1 overflow-auto">
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            <Messages
              messages={messages}
              group_id={group_id}
              setRefToLastMessage={setRefToLastMessage}
            />
          </div>
        </div>
        {status === "out" && (
          <>
            <hr />
            <h2 className="text-center">You Are Out Of This Conversation</h2>
            <hr />
          </>
        )}
        {status === "active" && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
              <InputGroup>
                <Form.Control
                  as="textarea"
                  required
                  ref={textRef}
                  style={{ height: "75px", resize: "none" }}
                />
                <InputGroup>
                  <Button type="submit" className={`bg-${theme} border-0 mt-1`}>
                    Send
                  </Button>
                </InputGroup>
              </InputGroup>
            </Form.Group>
          </Form>
        )}
      </div>
      {modalOpen && (
        <Modal show={modalOpen} onHide={closeModal}>
          <EditConversationModal closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default CurrentConversation;
