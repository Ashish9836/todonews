import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const NavbarComp = () => {
  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TodoNews</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="todo">My Todo</Nav.Link>
            <Nav.Link href="news">My News</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="signup">Signup</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default NavbarComp;
