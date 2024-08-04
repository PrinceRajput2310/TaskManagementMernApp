import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { logoutUserRequest } from "../redux/reduxSlice/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Name = localStorage.getItem("user");
  const logoutUser = () => {
    dispatch(logoutUserRequest());

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
          <span>
            <GiNotebook />
          </span>{" "}
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
