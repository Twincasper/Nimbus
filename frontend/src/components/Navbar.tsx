import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@/adapters/authAdapter.ts";
import CurrentUserContext from "@/context/current-user-context.ts";
import ThemeDropdown from "@/components/ThemeDropdown.tsx";
import communities from "@/utils/communities.ts";
import toast from "react-hot-toast";

export default function Navbar({onSelectCategory}: {
  onSelectCategory: (categoryId: number | null) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(CurrentUserContext);

  return (
      <div className="navbar mr-auto z-20 p-0">
        <div className="flex-1">
        <a className="cursor-pointer" onClick={() => navigate("/")}>
  <div className="h-32 w-auto overflow-hidden flex items-center justify-center">
    <img
      src="/Nimbus.svg"
      alt="Nimbus Logo"
      className="h-32 w-auto transform scale-125" // Added scale transform
    />
  </div>
</a>
        </div>

        <div className="flex-1 justify-center navbar-center hidden lg:flex">
          <div className="dropdown dropdown-hover dropdown-end">
            <button
                tabIndex={0}
                role="button"
                className={`btn m-1 ${
                  location.pathname === "/" 
                    ? "bg-sky-400 hover:bg-sky-300 text-white" 
                    : ""
                }`}
                onClick={() => navigate("/community")}
            >
              Community
              <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </button>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-100/80 rounded-box z-10 menu p-2 shadow-2xl min-w-[9rem]"
            >
              {communities.map((category) => (
                  <li key={category.id}>
                    <Link
                        to={`/community/${category.id}`}
                        onClick={() => onSelectCategory(category.id)}
                        className="text-base-content"
                    >
                      {category.name}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-30 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Community</a>
              <ul className="p-2">
                <li>
                  <a>Rainy Days & Silver Linings</a>
                </li>
                <li>
                  <a>Calm in the Storm</a>
                </li>
                <li>
                  <a>Fluff Therapy</a>
                </li>
                <li>
                  <a>Nimbus Nook</a>
                </li>
                <li>
                  <a>Cumulus Care</a>
                </li>
                <li>
                  <a>Rainbow</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Profile section */}
        <div className="flex-1 justify-end">
          {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="form-control">
                  <ThemeDropdown />
                </div>
                <div className="dropdown dropdown-end z-20">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full border-2 border-accent">
                      <img alt="User avatar" src={currentUser?.profilePicture} />
                    </div>
                  </label>
                  <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-40 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link
                          to={`/user/${currentUser.id}`}
                          className="justify-between text-base-content"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                          to="/settings"
                          className="justify-between text-base-content"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                          onClick={() => {
                            logout();
                            toast("Take care!", { icon: "👋" });
                            navigate("/login");
                          }}
                          className="w-full text-left bg-transparent text-base-content"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
          ) : (
              <button
                  onClick={() => navigate("/login")}
                  className="btn bg-sky-400 hover:bg-sky-300 text-white"
              >
                Login
              </button>
          )}
        </div>
      </div>
  );
}
