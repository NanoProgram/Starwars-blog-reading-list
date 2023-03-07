import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import SWLogo from "../../img/SWLogo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">
          <img src={SWLogo} />
        </span>
      </Link>
      <div className="ml-auto">
        <Link to="/demo">
          <div class="dropdown">
            <button
              class="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </nav>
  );
};
