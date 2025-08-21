// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// // import axios from "axios";
// import Instance from "../Axios.ts";
// import "../App.css"

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await Instance.post("/auth/register", formData);
  
//       alert("Register Successful ✅");
//       console.log(res.data);
//     } catch (error: any) {
//       if (error.response && error.response.status === 409) {
//         // 409 ka matlab user already exists
//         alert("User already exists ❌");
//       } else if (error.response && error.response.data?.message) {
//         // Agar backend message bhej raha hai
//         alert(error.response.data.message);
//       } else {
//         alert("Register Failed ❌");
//       }
//       console.error(error);
//     }
//   };
  
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-[6%]">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Register
//         </button>
//       </form>

//       <p className="text-sm text-center mt-4">
//     Dont have an account?{" "}
//     <Link to="/login" className="text-blue-500 hover:underline">
//       Register here
//     </Link>
//   </p>

//     </div>
//   );
// };

// export default Register;






// import React from 'react'

// const Register = () => {
//   return (
//     <div>Register</div>
//   )
// }

// export default Register





// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Instance from "../Axios.ts";
// import "../App.css";

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await Instance.post("/auth/register", formData);

//       if (res.status === 201) {
//         alert("Register Successful ✅");
//         console.log(res.data);
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 409) {
//           // 409 = User already exists
//           alert("User already exists ❌");
//         } else if (error.response.data?.message) {
//           // Backend se specific error message
//           alert(error.response.data.message);
//         } else {
//           alert("Something went wrong ❌");
//         }
//       } else {
//         alert("Server not responding ❌");
//       }
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-[6%]">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Register
//         </button>
//       </form>

//       <p className="text-sm text-center mt-4">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-500 hover:underline">
//           Login here
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Instance from "../Axios.ts";
import "../App.css";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await Instance.post("/auth/register", formData);

      if (res.status === 201) {
        alert("Register Successful ✅");
        navigate("/login"); // ✅ Redirect to login after successful register
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("User already exists ❌");
        } else if (error.response.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong ❌");
        }
      } else {
        alert("Server not responding ❌");
      }
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-[6%]">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
