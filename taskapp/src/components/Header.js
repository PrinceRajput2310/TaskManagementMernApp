import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const Name = cookie.get("user");
  const logoutUser = async () => {
    const user = await axios.get("http://localhost:5000/api/v1/logout", {
      withCredentials: true,
    });
    const message = await user.data.message;
    console.log(message);
    cookie.remove("token");
    navigate("/");
  };

  const navigateToAdminPage = () => {
    navigate("/admin");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand
          href="#"
          style={{ fontFamily: "cursive", outline: "none", background: "none" }}
        >
          Task Management
        </Navbar.Brand>
        <Dropdown align={"end"} title="Hello">
          <Dropdown.Toggle
            variant="secondry"
            id="dropdown-basic"
            style={{ border: "none", outline: "none" }}
          >
            Welcome,{Name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
            <Dropdown.Item onClick={navigateToAdminPage}>
              Admin Page
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
