import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.DASHBOARD_CALLBACK_URI,
    scope: ['identify', 'guilds'],
}, async (accesToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    console.log(accesToken, refreshToken);
    console.log(profile);
}));