// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const GoogleCallback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const code = query.get("code"); // Google se aaya hua code

//     if (code) {
//       // Backend ko bhejo token exchange ke liye
//       axios.post("http://localhost:4000/api/auth/google/callback", { code }, { withCredentials: true })
//         .then(res => {
//           alert("Google Login Successful ✅");
//           navigate("/Home");
//         })
//         .catch(err => {
//           alert("Google Login Failed ❌");
//           console.error(err);
//         });
//     } else {
//       alert("No code found in URL");
//     }
//   }, [location, navigate]);

//   return <div>Logging in with Google...</div>;
// };

// export default GoogleCallback;

    // import { useEffect } from "react";
    // import { useNavigate, useLocation } from "react-router-dom";

    // const GoogleCallback = () => {
    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     // Backend redirect ke baad URL me ?token=XYZ aayega
    //     const query = new URLSearchParams(location.search);
    //     const token = query.get("token");
    
    //     console.log("Google callback useEffect triggered");
    //     console.log("Full URL search params:", location.search);
    //     console.log("Token from URL:", token);
    
    //     if (token) {
    //         // Token ko localStorage me save karo
    //         localStorage.setItem("token", token);
    //         alert("Google Login Successful ✅");
    
    //         // Redirect to home page
    //         navigate("/home");
    //     } else {
    //         alert("Google Login Failed ❌");
    
    //         // Agar token nahi aaya toh login page par wapas bhejo
    //         navigate("/login");
    //     }
    // }, [location, navigate]);
    

    // return (
    //     <div className="min-h-screen flex items-center justify-center">
    //     <p className="text-lg font-semibold">Logging in with Google...</p>
    //     </div>
    // );
    // };

    // export default GoogleCallback;







    // import { useEffect } from "react";
    // import { useNavigate, useLocation } from "react-router-dom";
    // import Instance from "../Axios.ts";
    
    // const GoogleCallback = () => {
    //   const navigate = useNavigate();
    //   const location = useLocation();
    
    //   useEffect(() => {
    //     const query = new URLSearchParams(location.search);
    //     const code = query.get("code");
    
    //     if (code) {
    //       Instance.post("/auth/google/callback", { code })
    //         .then(res => {
    //           localStorage.setItem("token", res.data.token);
    //           alert("Google Login Successful ✅");
    //           navigate("/home");
    //         })
    //         .catch(err => {
    //           console.error(err.response?.data || err.message);
    //           alert("Google Login Failed ❌");
    //           navigate("/login");
    //         });
    //     } else {
    //       alert("No code found in URL");
    //       navigate("/login");
    //     }
    //   }, [location, navigate]);
    
    //   return <div>Logging in with Google...</div>;
    // };
    
    // export default GoogleCallback;
    










    import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Instance from "../Axios.ts";
import UserContext from "../context/UseContext.tsx";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(UserContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      Instance.post("/auth/google/callback", { code })
        .then(res => {
          login(res.data.token); 
          alert("Google Login Successful ✅");
          navigate("/home");
        })
        .catch(err => {
          console.error(err.response?.data || err.message);
          alert("Google Login Failed ❌");
          navigate("/login");
        });
    } else {
      alert("No code found in URL");
      navigate("/login");
    }
  }, [location, navigate, login]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
