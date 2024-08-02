import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiEndPoints";
import { LOCALHOST_BACKEND_URL } from "../utils/apiEndPoints";

function Header() {
  const navigate = useNavigate();
  const Name = cookie.get("user");
  const token = localStorage.getItem("token");
  const logoutUser = async () => {
    const user = await axios.get(`${API_URL}/api/v1/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const message = await user.data.message;
    console.log(message);
    localStorage.removeItem("token");
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
