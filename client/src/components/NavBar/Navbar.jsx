import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import logo from '../../assets/LogoFood.png';

const NavBar = () => {
  

  return (
    <div className={style.mainContainer}>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Link to="/about">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <div className={style.divLink}>
            <Link className={style.container} to="/home">
              Home
            </Link>
            <div className={style.divLink}>
              <Link className={style.container} to="/create">
                Create
              </Link>
            </div>
            <div className={style.divLink}>
              <Link className={style.container} to="/about">
                About
              </Link>
            </div>
            <div className={style.divLink}>
              <Link className={style.container} to="/">
                Logout
              </Link>
            </div>
          </div>
        
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

