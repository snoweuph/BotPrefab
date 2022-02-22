import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { User } from '../../base/schemas/Index';

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        return done(error, null);
    }
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.DASHBOARD_CALLBACK_URI,
    scope: ['identify', 'guilds'],
}, async (accesToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const { id: discordId } = profile;
    try {
        const existingUser = await User.findOneAndUpdate(
            { discordId },
            { accesToken, refreshToken },
            { new: true }
        );
        if (existingUser) return done(null, existingUser);
        const newUser = await new User({ discordId, accesToken, refreshToken }).save();
        return done(null, newUser);
    } catch (error) {
        return done(error as any, undefined)
    }

}));