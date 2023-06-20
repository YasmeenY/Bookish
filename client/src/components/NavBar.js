import {Link} from "react-router-dom";
import UserIcon from "../Images/UserIcon.png";
import "./NavBar.css"

function NavBar({user, data}) {
    return (
        <header>
            <nav className="nav">
                <Link to="/" className="link">
                    <div className="logo-container">
                        <h3>Bookish</h3>
                    </div>
                </Link>
                {/* <button className="sort-btn" onClick={toggleTheme}>{buttonText}</button> */}
                <div className="nav-ul">
                    <div className="active">
                        <Link to="/" className="link">
                            Home
                        </Link>
                    </div>
                    <div className="active">
                        <Link to="/search" className="link">
                            Search
                        </Link>
                    </div>
                    <div className="active">
                        <Link to="/Books" className="link">
                            Books
                        </Link>
                    </div>
                    {user !== "" ? (
                        <div className="active user-icon-container">
                            <Link to="/profile" className="link">
                                <img src={data.image} alt="No Logo Available"></img>
                            </Link>
                        </div>
                    ): (
                        <div className="active user-icon-container">
                            <Link to="/sign" className="link">
                                <img src={UserIcon} alt="No Logo Available"></img>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )}

export default NavBar;