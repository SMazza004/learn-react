import { JSX, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import "../../assets/css/AuthLayout.css";
import { Card } from "react-bootstrap";

export default function AuthLayout() {
  const navigate = useNavigate();

  /* useEffect(() => {
        navigate("/dashboard");
    }, []); */

  return (
    <div className="auth">
      <Card style={{ width: "30rem" }}>
        <Outlet />
      </Card>
    </div>
  );
}
