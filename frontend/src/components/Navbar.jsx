import { useState } from "react";
import { Link } from "react-router-dom";

// components
import Cart from "./Cart";

import logo from "../images/logo.png";

// style
import classes from "./Navbar.module.css";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = ({ showMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={classes.navbar_container}>
      <Link to={"/"} className={classes.logo}>
        <img src={logo} alt="Logotipo" />
      </Link>

      {showMenu && (
        <div className={classes.menu}>
          <Link to={"/"}>Início</Link>
          <Link to={"/cardapio"}>Cardápio</Link>
          <button className="btn btn-red" onClick={() => setOpenSidebar(true)}>
            <MdOutlineShoppingBag />
            <p>Sacola</p>
          </button>
        </div>
      )}

      <Cart openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

export default Navbar;
