import { Request, Response } from "express";

const express = require("express");
require("dotenv").config({ path: "../.env" });
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3001;
const buildPath = path.join(__dirname, "../src/build");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(buildPath));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

interface AuthorizationCodeGrantResponse {
  body: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

app.post("/refresh", (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/callback",
    clientId: "f7dfe6e6cd314d8c83dbf81b737932b4",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data: AuthorizationCodeGrantResponse) => {
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
    redirectUri: "http://localhost:3000/callback",
    clientId: "f7dfe6e6cd314d8c83dbf81b737932b4",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data: AuthorizationCodeGrantResponse) => {
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
