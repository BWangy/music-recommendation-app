import { Request, Response } from "express";

import express from "express";
import dotenv from "dotenv";
import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";
import path from "path";

const __dirname = import.meta.dirname;
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
}

const PORT = process.env.PORT || 3001;
/* const buildPath = path.join(__dirname, "../src/build"); */

const allowedOrigins = [
  "https://newmusic-kfa2.onrender.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
/* app.use(express.static(buildPath));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"));
}); */

/* interface AuthorizationCodeGrantResponse {
  body: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}
 */
app.post("/refresh", (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:
      process.env.NODE_ENV === "production"
        ? "https://newmusic-kfa2.onrender.com/callback"
        : "http://localhost:3000/callback",
    clientId: "f7dfe6e6cd314d8c83dbf81b737932b4",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data /* : AuthorizationCodeGrantResponse */) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req: Request, res: Response) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:
      process.env.NODE_ENV === "production"
        ? "https://newmusic-kfa2.onrender.com/callback"
        : "http://localhost:3000/callback",
    clientId: "f7dfe6e6cd314d8c83dbf81b737932b4",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data /* : AuthorizationCodeGrantResponse */) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("Error in authorizationCodeGrant:", error.message);
      } else {
        console.error("Unexpected error in authorizationCodeGrant:", error);
      }
      res.sendStatus(400);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
