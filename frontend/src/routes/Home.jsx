// components
import Navbar from "../components/Navbar.jsx";
import Carrosel from "../components/Carrosel.jsx";

// images
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";

// style
import classes from "./Home.module.css";

const Home = () => {
  const images = [img1, img2, img3];

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.home_container}>
        <div className={classes.title}>
          <Carrosel images={images} />
          <h1>Mais Pedidos</h1>
          <p>Lista de produtos mais pedidos</p>
        </div>
      </div>
    </>
  );
};

export default Home;
