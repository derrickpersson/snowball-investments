import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { AppDataSource } from '../data-source';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'super-duper-secret-key',
    algorithms: ['HS256'],
};

export const configurePassportForJWT = () => {
    passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await AppDataSource.manager.getRepository(User).findOneByOrFail({id: jwt_payload.id});
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