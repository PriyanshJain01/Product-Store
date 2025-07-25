import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import { useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import { useThemeStore } from "../Store/useThemeStore.js"; // Import the theme store
import { useProductStore } from "../Store/useProductStore.js";
import { useUserStore } from "../Store/useUserStore.js";

function Navbar() {
  const { theme, setTheme } = useThemeStore(); // Access the theme and setTheme from the store
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  const {products,cartNum}=useProductStore();
  const {signOut,currentUser,signedIn}=useUserStore();

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  POSGRESTORE
                </span>
              </div>
            </Link>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center gap-10">
            <ThemeSelector />

            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    {cartNum}
                  </span>
                </div>
              </div>
            )}
            {signedIn && (
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                {currentUser}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button onClick={signOut}>Sign Out</button>
                </li>
              </ul>
            </div>
            )}
            {!signedIn && (
              <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Get Started
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
