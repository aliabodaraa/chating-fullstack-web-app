import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { TypeHandleSubmit } from "../common.types";

type LoginProps = { onIdSubmit: (str_id: string) => void };

const Login = ({ onIdSubmit }: LoginProps) => {
  console.log("Login");
  const idRef = useRef<HTMLInputElement>(null!);
  let handleSubmit: TypeHandleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };
  let createNewId = () => {
    onIdSubmit(`user-${uuidV4()}`);
  };
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button type="button" onClick={createNewId}>
          create a new id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
