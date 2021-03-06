import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import * as Icon from "react-feather";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useAuth();
  const navigate = useNavigate();

  function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <div>
        <Link style={{ color: match ? "#0d6efd" : "none" }} to={to} {...props}>
          {children}
        </Link>
        {match && ""}
      </div>
    );
  }

  return (
    <div className="w-100 align-items d-flex justify-content-between p-0">
      <div className="header-avatar">
        <img
          className="rounded-circle border border-white"
          style={{ width: 50, height: 50, objectFit: "cover" }}
          src={
            user.avatar ||
            "https://cdt.org/files/2015/10/2015-10-06-FB-person.png"
          }
          alt="user"
        />
      </div>
      <nav className="nav flex-row px-1 justify ">
        <CustomLink className=" icon-navbar  icon-item my-2" to="/">
          <Icon.Home />
        </CustomLink>
        <CustomLink className="icon-navbar icon-item  my-2" to="/message">
          <Icon.MessageCircle />
        </CustomLink>
        <CustomLink className=" icon-navbar icon-item my-2" to="/create-post">
          <Icon.FilePlus />
        </CustomLink>
        <CustomLink className="icon-navbar  icon-item  my-2" to="/friends">
          <Icon.UserPlus />
        </CustomLink>

        {/* <div className="btn-group">
          <button
            type="button"
            className="btn  dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Icon.Bell />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">
              Action
            </button>
            <button className="dropdown-item" type="button">
              Another action
            </button>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </div>
        </div> */}
      </nav>
      <div className="btn-group  button-header ">
        <button
          type="button"
          className="btn  dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Icon.Settings />
        </button>
        <ul className="dropdown-menu">
          {/* <li><Link className='dropdown-item' to="/login">Sigout <Icon.ChevronRight className='float-end text-secondary' /></Link></li> */}
          <li>
            <a
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
                navigate("/login");
              }}
            >
              Sigout <Icon.ChevronRight className="float-end text-secondary" />
            </a>
          </li>
          <li>
            <Link className="dropdown-item" to={`/user/${user._id}`}>
              Profile <Icon.ChevronRight className="float-end text-secondary" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
