
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Instance from "../Axios.ts"; 

// type Form = { email: string; password: string };

// const Login = () => {
//   const [form, setForm] = useState<Form>({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErr(null);
//     setLoading(true);
//     try {
//       // NOTE: your backend mounts auth at /api/auth/*
//       const res = await Instance.post("/auth/login", form);
//       // save token (also cookie for refresh is set by backend)
//       localStorage.setItem("accessToken", res.data?.accessToken);
//       // (optional) save user
//       localStorage.setItem("user", JSON.stringify(res.data?.user));
//       navigate("/");
//     } catch (error: any) {
//       setErr(error?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // This hits your backend: router.use('/auth', authRoutes)
//     window.location.href = "http://localhost:4000/api/auth/google";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded focus:outline-none focus:ring"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded focus:outline-none focus:ring"
//             required
//           />

//           {err && (
//             <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
//               {err}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2.5 rounded font-medium hover:bg-green-700 transition disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="my-4 flex items-center">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="px-3 text-gray-400 text-sm">or</span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full border py-2.5 rounded font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           Continue with Google
//         </button>

//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;





import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import Instance from "../Axios";
import en from "../context/en"



interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await Instance.post("/auth/login", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Login Successfull");
        navigate("/Home");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || en.login.loginFailed);
    } finally {
      setIsLoading(false);
    }
  }

  // function handleGoogleLogin() {
  //   console.log("first");
  //   const clientId = "622446441808-cku6f4sb2lo8ni57hbv94pghcpht0rin.apps.googleusercontent.com";
  //   const redirectUri = `${window.location.origin}/google/callback`;
  //   console.log(redirectUri)
  //   console.log(clientId)
  //   const scope =
  //     "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  //   const responseType = "code";
  //   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(
  //     scope
  //   )}&access_type=offline`;
  //   console.log(authUrl)
  //   window.location.href = authUrl;
  // }


  // function handleGoogleLogin() {
  //   // Simply redirect to backend route
  //   window.location.href = "http://localhost:4000/api/auth/google";
  // }
  


  function handleGoogleLogin() {
    const clientId = "622446441808-cku6f4sb2lo8ni57hbv94pghcpht0rin.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/google/callback`;
    const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "code";
  
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&access_type=offline`;
    
    // Redirect user to Google login
    window.location.href = authUrl;
  }
  


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="p-6 sm:p-8 rounded-2xl shadow-2xl text-black bg-white/10 backdrop-blur-xl border border-black/20">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {en.login.title}
            </h2>

            <button
              className="px-3 py-1 my-2 mx-auto w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-110 shadow-md flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <span className="text-xl font-bold text-white">
                {en.login.googleLogin}
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={en.login.emailPlaceholder}
                required
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-black/20 text-black focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={en.login.passwordPlaceholder}
                required
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/5 border border-black/20 text-black focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
            >
              {isLoading ? en.login.signingIn : en.login.loginButton}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-black/70">
              {en.login.noAccount}{" "}
              <Link
                to="/register"
                className="text-purple-300 font-semibold underline"
              >
                {en.login.register}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



