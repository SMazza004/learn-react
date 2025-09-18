import { Outlet } from "react-router";
import TopNavbar from "../Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar, { SidebarItem } from "../Sidebar";
import { PieChart, PlusSquare } from "react-bootstrap-icons";

export default function DefaultLayout() {
  return (
    <Container fluid className="px-0">
      <Row className="w-100">
        <Col md={2} className="p-0">
          <Sidebar>
            <SidebarItem
              image={<PieChart />}
              text="Dashboard"
              path="/dashboard"
            />
            <SidebarItem
              image={<PlusSquare />}
              text="New Data"
              path="/data/new"
            />
          </Sidebar>
        </Col>
        <Col md={10} className="p-0">
          <TopNavbar />
          <div className="ps-2">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
