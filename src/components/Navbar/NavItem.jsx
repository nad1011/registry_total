import { Link } from "react-router-dom";

function NavItem({ index, item }) {
  return (
    <li key={index} className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  );
}

export default NavItem;
