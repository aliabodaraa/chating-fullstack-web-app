import { Container, Navbar } from "react-bootstrap";
import { useTheme } from "../contexts/ThemesProvider";
export default function NavBar() {
  let { theme } = useTheme();
  console.log("ali" + theme);
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand>WhatsApp</Navbar.Brand>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          cursor="pointer"
          className={`bi bi-person-circle text-${theme}`}
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            className={`bi bi-person-circle text-${theme}`}
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </Container>
    </Navbar>
  );
}
