import { useState } from "react";
import { Button, Modal as BootstrapModal } from "react-bootstrap";

import NewContactsModal from "./NewContactsModal";
import NewConversationsModal from "./NewConversationsModal";
import { useTheme } from "../contexts/ThemesProvider";

type ModalPropsType = {
  isConversationsOpen: boolean;
};
export default function Modal({ isConversationsOpen }: ModalPropsType) {
  let [modalOpen, setModalOpen] = useState(false);
  let { theme } = useTheme();
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <Button
        className={`rounded border-0 bg-${theme}`}
        onClick={() => setModalOpen(true)}
      >
        New {isConversationsOpen ? "Conversation" : "Contact"}
      </Button>
      <BootstrapModal show={modalOpen} onHide={closeModal}>
        {isConversationsOpen ? (
          <NewConversationsModal closeModal={closeModal} theme={theme} />
        ) : (
          <NewContactsModal closeModal={closeModal} theme={theme} />
        )}
      </BootstrapModal>
    </>
  );
}
