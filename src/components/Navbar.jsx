import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("s");
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("s", searchTerm);
      props.setError(false);
      props.setSearchTerm(searchTerm);
      navigate(`${location.pathname}?${queryParams.toString()}`);
    }
  };

  const handleNavLinkClick = () => {
    setCollapsed(true);
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light header-fixed">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="newlink_logo.png"
              className="nav-logo img-fluid"
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  onClick={handleNavLinkClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/business"
                  onClick={handleNavLinkClick}
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/health"
                  onClick={handleNavLinkClick}
                >
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/science"
                  onClick={handleNavLinkClick}
                >
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/sports"
                  onClick={handleNavLinkClick}
                >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/entertainment"
                  onClick={handleNavLinkClick}
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/technology"
                  onClick={handleNavLinkClick}
                >
                  Technology
                </Link>
              </li>
            </ul>
            <form
              className="d-flex"
              onSubmit={handleSearch}
              style={{ height: "40px" }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ height: "100%" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
