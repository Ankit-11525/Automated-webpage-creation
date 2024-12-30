import { useState } from "react";
import Link from "next/link";
interface NavbarProps {
  uname :string;
}
const Navbar = ({uname}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 rounded-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side: Name */}
        <div className="text-xl font-bold text-[#40348C]">
          <Link href="/"> {uname}</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Right side: Links (hidden on mobile, visible on medium and larger screens) */}
        <div className="hidden md:flex space-x-8">
          <Link href="#aboutme" className="hover:text-gray-400 text-black">
            About Me
          </Link>
          <Link href="#resume" className="hover:text-gray-400 text-black">
            Resume
          </Link>
          <Link href="#portfolio" className="hover:text-gray-400 text-black">
            Portfolio
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Visible when the menu is open) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4 mt-8 rounded-md">
          <Link href="#aboutme" className="block text-white">
            About Me
          </Link>
          <Link href="#resume" className="block text-white">
            Resume
          </Link>
          <Link href="#portfolio" className="block text-white">
            Portfolio
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
