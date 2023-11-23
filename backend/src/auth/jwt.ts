import * as passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { AppDataSource } from '../data-source';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
    if (req && req.cookies && req.cookies['jwt']) {
        const jwtCookieValue = req.cookies['jwt']
        return parseCookieValue(jwtCookieValue);
    }
    return null;
}

const parseCookieValue = (cookie: string) => {
    const match = cookie.match(/jwt=([^;]+)/);
    return match ? match[1] : null;
}

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'super-duper-secret-key',
    algorithms: ['HS256'],
};

export const configurePassportForJWT = () => {
    passport.use('jwt', new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            const user = await AppDataSource.manager.getRepository(User).findOneByOrFail({id: jwtPayload.id});
            delete user.password
            if (user) {
                return done(null, user);
            };
        } catch (error: any) {
            console.error(error);
            return done(error, false);
        }
    }));
}


export const issueJWT = (userId: string) => {
    const payload = {
        id: userId,
        iat: Date.now()
    };

    return jwt.sign(payload, opts.secretOrKey, { 
        expiresIn: '1d',
        algorithm: 'HS256'
     });
}