import { PrismaClient } from "@prisma/client";
import { Application } from "express";

import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { env } from "src/config/environment";

export const withGoogle = (app: Application, prisma: PrismaClient) => {
  //   app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/oauth/google",
        scope: ["profile", "email", "openid"],
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback
      ) {
        let user = await prisma.user.findUnique({
          where: {
            id: profile.id,
          },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              id: profile.id,
              name: profile.displayName,
              email: profile.emails![0].value,
              username: profile.emails![0].value.split("@")[0],
              pic: profile.photos![0].value,
            },
          });
        }
        return cb(null, { user, refreshToken, accessToken });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ["profile", "email", "openid"],
    })
  );

  app.get(
    "/oauth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    function (req, res) {
      // @ts-expect-error
      req.session.userId = req.user.user.id;
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
// Code snippet from index.ts
