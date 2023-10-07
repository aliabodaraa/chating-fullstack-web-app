import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = () => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const alerts = [].map((alert, index) => {
    return (
      <Toast
        key={index}
        show={showA}
        onClose={toggleShowA}
        bg="dark"
        position="middle-start'"
        delay={3000}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{alert.sender}</strong>
          <small>
            {alert.date} {alert.time} mins ago
          </small>
        </Toast.Header>
        <Toast.Body className="text-white">{alert.text}</Toast.Body>
      </Toast>
    );
  });
  return (
    <ToastContainer className="position-static position-absolute top-10">
      {alerts}
    </ToastContainer>
  );
};

export default ToastMessage;
