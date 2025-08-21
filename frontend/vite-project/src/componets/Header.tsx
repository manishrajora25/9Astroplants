// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Header = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
//       <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold tracking-wide">
//           🚀 MyBrand
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex gap-6 font-medium">
//           <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
//           <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
//           <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
//           <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? "✖" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {open && (
//         <nav className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
//           <Link to="/" className="block hover:text-yellow-300">Home</Link>
//           <Link to="/about" className="block hover:text-yellow-300">About</Link>
//           <Link to="/contact" className="block hover:text-yellow-300">Contact</Link>
//           <Link to="/login" className="block hover:text-yellow-300">Login</Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;



import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Instance from "../Axios";
// import UserContext from "../context/UseContext";
import UserContext from "../context/UseContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await Instance.get("/api/auth/logout", { withCredentials: true });
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("role");
  //     setToken({ token: "", role: "" }); // update context
  //     alert("Logged out successfully ✅");
  //     navigate("/login");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Logout failed ❌");
  //   }
  // };


  const handleLogout = async () => {
    try {
      await Instance.get("/api/auth/logout", { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken({ token: "", role: "" }); // context update
      alert("Logged out successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed ❌");
    }
  };
  


  const isLoggedIn = !!token;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🚀 MyBrand
        </Link>

        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-yellow-300 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          )}
        </nav>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
          <Link to="/" className="block hover:text-yellow-300">Home</Link>
          <Link to="/about" className="block hover:text-yellow-300">About</Link>
          <Link to="/contact" className="block hover:text-yellow-300">Contact</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="block hover:text-yellow-300 w-full text-left">
              Logout
            </button>
          ) : (
            <Link to="/login" className="block hover:text-yellow-300">Login</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
