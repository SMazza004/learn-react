import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { User } from "../types/types";
import { RootState } from "../store/store";

import "../assets/css/Navbar.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const user: User | null = useSelector(
    (store: RootState) => store.userSlice.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, []);

  return (
    <Navbar className="navbar-wrapper">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as{" "}
            <Link to="/login" className="text-white">
              {user?.email}
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
