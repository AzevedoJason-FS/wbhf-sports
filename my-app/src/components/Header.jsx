import { Link } from "react-router-dom";

const Header = () => {
  const date = new Date();
  return (
    <header>
        <div className="header-content">
      <img src="/global-images/logo.svg" alt="Bartow Sports Zone" />
      <nav>
        <Link to={`/`} className="nav-link">
          News
        </Link>
        <Link to={`/`} className="nav-link">
          Scores
        </Link>
        <Link to={`/`} className="nav-link">
          Schedule
        </Link>
        <Link to={`/`} className="nav-link">
          Standings
        </Link>
        <Link to={`/`} className="nav-link">
          B.G.M.S.A.A
        </Link>
        <Link to={`/`} className="nav-link">
          Contact
        </Link>
        <Link to={`/`} className="nav-link">
          Athlestes Beyond Bartow
        </Link>
      </nav>
      <div>
        <p>Fridays 7:10 am - 9 am</p>
        <p>WBHF AM 1450 / 100.3 FM</p>
      </div>
      </div>
    </header>
  );
};

export default Header;
