import { Link } from "react-router-dom"
import "./Nav.css";


const NavbarTodo = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addTodo">+Add</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavbarTodo