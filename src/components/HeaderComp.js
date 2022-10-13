import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import { Cart4 } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { LOG_OUT } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetCart } from "../features/cartSlice";
function HeaderComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart) || [];
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalQuantity = () => {
    let total = 0;
    if (cart) {
      cart.forEach((item) => {
        total += item.quantity;
      });
    }
    return total;
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logoutUser(user.token);
    if (!response.success) {
      toast.error("Error while logging out");
    } else {
      setIsLoading(false);
      toast.success("User Logged out successfully");
      dispatch(LOG_OUT());
      dispatch(resetCart());
      navigate("/");
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="sticky-nav header">
      <Container>
        <Navbar.Brand>Food Zone</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <Nav.Link onClick={() => navigate("/user/productList")}>
              categories
            </Nav.Link>
          )}

          {user && user.user.userType != "admin" ? (
            <Nav.Link onClick={() => navigate("/user/customerOrderView")}>
              Orders
            </Nav.Link>
          ) : // <Nav.Link onClick={() => navigate("/user/dashboard")}>
          //   Dashboard
          // </Nav.Link>
          null}
          {user && user.user.userType == "admin" ? (
            <Nav.Link onClick={() => navigate("/user/dashboard")}>
              Dashboard
            </Nav.Link>
          ) : null}
        </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Link onClick={() => navigate("register")}>
                  Register
                </Nav.Link>
                <Nav.Link onClick={() => navigate("login")}>Login</Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text>{user.user.name}</Navbar.Text>
                <Nav.Link onClick={() => handleLogout()} disabled={isLoading}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && user.user.userType != "admin" ? (
            <Button
              variant="warning"
              onClick={() => navigate("/user/cart")}
              disabled={cart.length < 1}
            >
              <Cart4 className="cartIcon" color="white" size={24} />{" "}
              <Badge bg="info">{getTotalQuantity() || 0}</Badge>
            </Button>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComp;
