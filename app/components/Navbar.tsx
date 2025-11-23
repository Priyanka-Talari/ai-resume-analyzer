// Navbar.tsx (Final Fix)

import { Link } from "react-router"; // KEEPING 'react-router' as requested

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient" >RESUMING</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    );
}

export default Navbar;