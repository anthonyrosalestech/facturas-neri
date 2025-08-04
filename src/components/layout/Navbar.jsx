import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    // { name: "Inicio", href: "#" },
    // { name: "Servicios", href: "#" },
    // { name: "Proyectos", href: "#" },
    // { name: "Contacto", href: "#" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary fs-3" href="/">
          <img
            src="/logo_v1.png"
            alt="MiLogo"
            style={{ width: "150px", objectFit: "contain" }}
            className="me-2"
          />
          {/* MiLogo */}
        </a>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse ${open ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.name}>
                <a className="nav-link fw-medium" href={link.href}>
                  {link.name}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-primary px-4"
                onClick={() => {
                  localStorage.clear();
                  console.log("✅ LocalStorage borrado");
                }}
              >
                Clear LocalStorage
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
