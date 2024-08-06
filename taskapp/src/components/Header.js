import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { logoutUserRequest } from "../redux/reduxSlice/userSlice";
import logo from "../assets/notebook.svg";

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
          onClick={() => navigate("/home")}
          style={{
            fontFamily: "cursive",
            outline: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <span>
            <img src={logo} alt="logo" width={50} height={50} />
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
            <Dropdown.Item onClick={() => navigate("/profile")}>
              <CgProfile size={20} /> Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={navigateToAdminPage}>
              <RxDashboard /> Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/analytics")}>
              <TbBrandGoogleAnalytics size={20} /> Analytics
            </Dropdown.Item>
            <Dropdown.Item onClick={logoutUser}>
              {" "}
              <IoLogOutOutline size={25} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
