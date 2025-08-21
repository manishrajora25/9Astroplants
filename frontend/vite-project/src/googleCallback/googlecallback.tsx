// // import { useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const GoogleCallback = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   useEffect(() => {
// //     const query = new URLSearchParams(location.search);
// //     const code = query.get("code"); // Google se aaya hua code

// //     if (code) {
// //       // Backend ko bhejo token exchange ke liye
// //       axios.post("http://localhost:4000/api/auth/google/callback", { code }, { withCredentials: true })
// //         .then(res => {
// //           alert("Google Login Successful ✅");
// //           navigate("/Home");
// //         })
// //         .catch(err => {
// //           alert("Google Login Failed ❌");
// //           console.error(err);
// //         });
// //     } else {
// //       alert("No code found in URL");
// //     }
// //   }, [location, navigate]);

// //   return <div>Logging in with Google...</div>;
// // };

// // export default GoogleCallback;

//     // import { useEffect } from "react";
//     // import { useNavigate, useLocation } from "react-router-dom";

//     // const GoogleCallback = () => {
//     // const navigate = useNavigate();
//     // const location = useLocation();

//     // useEffect(() => {
//     //     // Backend redirect ke baad URL me ?token=XYZ aayega
//     //     const query = new URLSearchParams(location.search);
//     //     const token = query.get("token");
    
//     //     console.log("Google callback useEffect triggered");
//     //     console.log("Full URL search params:", location.search);
//     //     console.log("Token from URL:", token);
    
//     //     if (token) {
//     //         // Token ko localStorage me save karo
//     //         localStorage.setItem("token", token);
//     //         alert("Google Login Successful ✅");
    
//     //         // Redirect to home page
//     //         navigate("/home");
//     //     } else {
//     //         alert("Google Login Failed ❌");
    
//     //         // Agar token nahi aaya toh login page par wapas bhejo
//     //         navigate("/login");
//     //     }
//     // }, [location, navigate]);
    

//     // return (
//     //     <div className="min-h-screen flex items-center justify-center">
//     //     <p className="text-lg font-semibold">Logging in with Google...</p>
//     //     </div>
//     // );
//     // };

//     // export default GoogleCallback;







//     // import { useEffect } from "react";
//     // import { useNavigate, useLocation } from "react-router-dom";
//     // import Instance from "../Axios.ts";
    
//     // const GoogleCallback = () => {
//     //   const navigate = useNavigate();
//     //   const location = useLocation();
    
//     //   useEffect(() => {
//     //     const query = new URLSearchParams(location.search);
//     //     const code = query.get("code");
    
//     //     if (code) {
//     //       Instance.post("/auth/google/callback", { code })
//     //         .then(res => {
//     //           localStorage.setItem("token", res.data.token);
//     //           alert("Google Login Successful ✅");
//     //           navigate("/home");
//     //         })
//     //         .catch(err => {
//     //           console.error(err.response?.data || err.message);
//     //           alert("Google Login Failed ❌");
//     //           navigate("/login");
//     //         });
//     //     } else {
//     //       alert("No code found in URL");
//     //       navigate("/login");
//     //     }
//     //   }, [location, navigate]);
    
//     //   return <div>Logging in with Google...</div>;
//     // };
    
//     // export default GoogleCallback;
    










//     import { useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Instance from "../Axios.ts";
// import UserContext from "../context/UseContext.tsx";

// const GoogleCallback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useContext(UserContext);

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const code = query.get("code");
//     console.log(code);
    
//     const redirectUri=`${window.location.origin}/google/callback`

//     if (code) {
//       Instance.post("/auth/google/callback", { code,redirectUri },{withCredentials:true})
//         .then(res => {
//           login(res.data.token); 
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
//   }, [navigate, login]);

//   return <div>Logging in with Google...</div>;
// };

// export default GoogleCallback;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import en from "../Envirement/en.js";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) {
      setLoading(false);
      return;
    }

    const redirectUri = `${window.location.origin}/google/callback`;

    const authenticateWithGoogle = async () => {
      try {
        const res = await axios.post(
          `http://localhost:4000/api/auth/google/callback`,
          { code, redirectUri },
          { withCredentials: true }
        );

        console.log("Google login success:", res.data);

        // Example: if backend sends user data
        if (res.status === 200 || res.status === 201) {
          navigate("/Home");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Google login error:", err);
        setLoading(false);
      }
    };

    authenticateWithGoogle();
  }, [navigate]);

  if (!loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-red-600">
        <h1>Google login failed. Try again.</h1>
      </div>
    );
  }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800">
    //   <div className="bg-blue-800/80 backdrop-blur-xl rounded-xl p-8 border border-blue-700/50 shadow-xl text-center text-white">
    //     <div className="mb-6">
    //       <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center animate-spin">
    //         <svg className="w-8 h-8 text-red-600" viewBox="0 0 48 48">
    //           <path
    //             fill="#EA4335"
    //             d="M24 9.5c3.15 0 5.96 1.1 8.18 2.92l6.12-6.12C34.62 2.65 29.63.5 24 .5 14.8.5 6.93 6.28 3.82 14.29l7.7 5.99C13.02 14.01 18.07 9.5 24 9.5z"
    //           />
    //           <path
    //             fill="#34A853"
    //             d="M46.5 24.5c0-1.65-.14-3.24-.41-4.77H24v9.04h12.8c-.55 2.9-2.21 5.36-4.63 7.02l7.3 5.66C44.62 37.57 46.5 31.41 46.5 24.5z"
    //           />
    //           <path
    //             fill="#FBBC05"
    //             d="M11.52 28.58A14.5 14.5 0 019.5 24c0-1.59.26-3.13.73-4.58l-7.7-5.99A23.85 23.85 0 000 24c0 3.91.94 7.6 2.6 10.87l8.92-6.29z"
    //           />
    //           <path
    //             fill="#4285F4"
    //             d="M24 48c6.48 0 11.92-2.13 15.9-5.8l-7.3-5.66c-2.1 1.42-4.78 2.26-8.6 2.26-5.93 0-10.98-4.51-12.48-10.49l-8.92 6.29C6.93 41.72 14.8 48 24 48z"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //     <h1 className="text-2xl font-bold mb-4 text-white">
    //       {en.googleCallback.title}
    //     </h1>
    //     <p className="text-gray-300 mb-6">{en.googleCallback.verifying}</p>
    //     <div className="w-64 mx-auto mb-4">
    //       <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
    //         <div className="h-full bg-green-400 rounded-full animate-pulse"></div>
    //       </div>
    //     </div>
    //     <div className="flex justify-center items-center space-x-2">
    //       <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
    //       <span className="text-gray-300 text-sm">
    //         {en.googleCallback.processing}
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div>loading..</div>
  );
};

export default GoogleCallback;