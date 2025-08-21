// import { Request, Response, NextFunction } from "express";
// import passport from "passport";
// // import * as cookie from "cookie";
// import { token } from "morgan";
// // import { serialize } from "cookie";
// import { env } from "../config/env";
// import catchAsync from "../utils/CatchAsync";
// import ApiError from "../utils/ApiError";
// import { createLocalUser } from "../services/userServices";
// import { buildAuthTokens, rotateRefreshToken } from "../services/authServices";

// const setRefreshCookie = (res: Response, refreshToken: string) => {
//   // const isProd = env.nodeEnv === 'production';
//   res.cookie("accessToken", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//     maxAge: 15 * 60 * 1000, // 15 min
//   });
// };

// export const register = catchAsync(async (req: Request, res: Response) => {
//   const { email, password, name } = req.body as {
//     email: string;
//     password: string;
//     name?: string;
//   };
//   const user = await createLocalUser({ email, password, name });
//   const tokens = buildAuthTokens({ id: user.id, email: user.email });
//   // setRefreshCookie(res, tokens.refreshToken);
//   res.status(201).json({
//     user: { id: user.id, email: user.email, name: user.name },
//     accessToken: tokens.accessToken,
//   });
// });

// export const login = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate(
//     "local",
//     { session: false },
//     (err: unknown, user: any, info?: { message?: string }) => {
//       if (err) return next(err);
//       if (!user)
//         return next(new ApiError(401, info?.message || "Invalid credentials"));
//       const tokens = buildAuthTokens({ id: user.id, email: user.email });
//       setRefreshCookie(res, tokens.refreshToken);
//       res.json({
//         user: { id: user.id, email: user.email, name: user.name },
//         accessToken: tokens.accessToken,
//       });
//     }
//   )(req, res, next);
// };

// export const refresh = catchAsync(async (req: Request, res: Response) => {
//   const token = req.cookies?.refreshToken as string | undefined;
//   if (!token) throw new ApiError(401, "No refresh token");
//   const tokens = await rotateRefreshToken(token);
//   setRefreshCookie(res, tokens.refreshToken);
//   res.json({ accessToken: tokens.accessToken });
// });

// export const logout = catchAsync(async (_req: Request, res: Response) => {
//   res.setHeader(
//     "Set-Cookie",
//     "refreshToken=; HttpOnly; Max-Age=0; Path=/api/auth/refresh"
//   );
//   res.json({ message: "Logged out" });
// });

// export const googleAuth = passport.authenticate("google", {
//   scope: ["profile", "email"],
//   session: false,
// });

// export const googleCallback = (f



  
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   passport.authenticate(
//     "google",
//     { session: false },
//     (err: unknown, user: any) => {
//       if (err) return next(err);
//       if (!user) return res.redirect(`${env.clientUrl}/auth?error=google`);
//       const tokens = buildAuthTokens({ id: user.id, email: user.email });

//       // Reuse the same cookie helper
//       setRefreshCookie(res, tokens.refreshToken);

//       const redirectUrl = `${env.clientUrl}/auth/callback#accessToken=${tokens.accessToken}`;
//       res.redirect(redirectUrl);
//     }
//   )(req, res, next);
// };







import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { env } from "../config/env";
import catchAsync from "../utils/CatchAsync";
import ApiError from "../utils/ApiError";
import { createLocalUser } from "../services/userServices";
import { buildAuthTokens, rotateRefreshToken } from "../services/authServices";
import axios from "axios";

// ✅ Refresh Token Cookie Setter
const setRefreshCookie = (res: Response, refreshToken: string) => {
  const isProd = env.nodeEnv === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd, // ✅ only secure in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth/refresh", // ✅ only sent when calling refresh
  });
};

// ✅ Register
export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body as {
    email: string;
    password: string;
    name?: string;
  };

  const user = await createLocalUser({ email, password, name });
  const tokens = buildAuthTokens({ id: user.id, email: user.email });

  setRefreshCookie(res, tokens.refreshToken);

  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken: tokens.accessToken,
  });
});

// ✅ Local Login
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: unknown, user: any, info?: { message?: string }) => {
      if (err) return next(err);
      if (!user)
        return next(new ApiError(401, info?.message || "Invalid credentials"));

      const tokens = buildAuthTokens({ id: user.id, email: user.email });

      setRefreshCookie(res, tokens.refreshToken);

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
        accessToken: tokens.accessToken,
      });
    }
  )(req, res, next);
};

// ✅ Refresh
export const refresh = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) throw new ApiError(401, "No refresh token");

  const tokens = await rotateRefreshToken(token);

  setRefreshCookie(res, tokens.refreshToken);

  res.json({ accessToken: tokens.accessToken });
});

// ✅ Logout
export const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.json({ message: "Logged out" });
});

// ✅ Google OAuth
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleCallback = async (req: Request, res: Response) => {
  console.log("hello")
  try {
    console.log(req.body)
    const { code, redirectUri } = req.body;

    if (!code || !redirectUri) {
      return res.status(400).json({ message: "Missing code or redirectUri" });
    }

    // 1️⃣ Code exchange with Google
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id:process.env.GOOGLE_CLIENT_ID,
      client_secret:process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri, // frontend se jo bhejoge wahi use hoga
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = tokenRes.data;

    // 2️⃣ Get user info from Google
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, id, name, picture } = userRes.data;
    const password =id
    
  const user = await createLocalUser({ email,password,name});
      const token = buildAuthTokens({ id: user.id, email: user.email });
    setRefreshCookie(res, token.refreshToken);
    // 3️⃣ Apne DB me user check/create/update
    // const user = await User.findOneAndUpdate({ email }, { name, picture }, { upsert: true, new: true });

    // 4️⃣ Apna JWT tokens banao
    // const tokens = buildAuthTokens({ id, email });
    // setRefreshCookie(res, tokens.refreshToken);

    return res.status(201).json({
      accessToken: token.accessToken,
      user: { email, name, picture },
    });
  } catch (err: any) {
    console.error("Google OAuth Error:", err.response?.data || err.message);
    return res.status(400).json({ message: "Google login failed" });
  }
};
