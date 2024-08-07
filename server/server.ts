import { Request, Response } from "express";

const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

interface AuthorizationCodeGrantResponse {
  body: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

app.post("/login", (req: Request, res: Response) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/callback",
    clientId: "f7dfe6e6cd314d8c83dbf81b737932b4",
    clientSecret: "67ebc02730e1483ba6e679df05f99af8",
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
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(3001);
