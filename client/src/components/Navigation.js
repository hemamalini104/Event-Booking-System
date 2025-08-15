import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ isLoggedIn, role, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const isLoginPage = location.pathname.toLowerCase() === "/login";

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Stylish Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-primary"
          style={{ fontSize: "1.5rem" }}
        >
          <i className="fas fa-calendar-check me-2"></i>
          EventBook
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* Show login button only if not logged in and NOT on login page */}
            {!isLoggedIn && !isLoginPage && (
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {isLoggedIn && (
              <>
                {/* My Transactions for both attendee & organizer */}
                <Nav.Link as={Link} to="/my-transactions">
                  My Transactions
                </Nav.Link>

                {/* Create Event only for organizer */}
                {role === "organizer" && (
                  <Nav.Link as={Link} to="/organizer/create">
                    Create Event
                  </Nav.Link>
                )}

                {/* Logout Button */}
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
