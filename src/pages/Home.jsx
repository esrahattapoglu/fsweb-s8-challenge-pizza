import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";
export default function Home() {

  return (
    <>
    <header className="hero">

       <a href="#">
          <img src={logo} alt="logo" />
        </a>

       <h1 className="hero-title">
        KOD ACIKTIRIR<br />
        PIZZA, DOYURUR
        </h1>

     <Link to="/order" className="hero-buton">
      ACIKTIM
     </Link>

</header>


    
    </>
  ) 
}
