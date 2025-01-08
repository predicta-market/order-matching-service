import {StatusCodes} from 'http-status-codes'
import {passwordUtility,tokenUtility,omit} from '../helper';
import { Request, Response, NextFunction } from 'express';


export async function signup(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const hashedPassword = await passwordUtility.hash(password);

    // const newUser = await repo.createUser({
    //     username: username,
    //     password: hashedPassword,
    // });

    const [accessToken, refreshToken] = tokenUtility.generateTokens(username);

    if(!accessToken || !refreshToken){
        throw new Error('Failed to generate user tokens.');
    }

    // save refresh token to redis
    await tokenUtility.saveRefreshToken(username, refreshToken);

    console.info('User created successfully.');

    return res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Successfully created new user.',
        code: StatusCodes.CREATED,
        data: {
            user: omit(newUser, ['password', 'createdAt']),
            accessToken,
            refreshToken,
        },
    });
}


export async function signin(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    // const storedUser = await userRepository.findWithUsername(username);

    if (!storedUser) throw new Error('This user does not exist.');

    const doesPasswordsMatch = passwordUtility.matches(
        storedUser.password,
        password
    );

    if (!doesPasswordsMatch) throw new Error('Passwords mismatch.');

    const cachedRefreshToken = await tokenUtility.retrieveRefreshToken(username);
    const [accessToken, genRefresh] = tokenUtility.generateTokens(username);

    const refreshToken = cachedRefreshToken ? cachedRefreshToken : genRefresh;

    if (cachedRefreshToken) {
        console.info(
            `Refresh token for user: ${username} still exists, reusing.`
        );
    } else {
        tokenUtility.saveRefreshToken(username, refreshToken);
    }

    console.info('User signed in successfully.');

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Successfully signed in.',
        code: StatusCodes.OK,
        data: {
            user: omit(storedUser, ['password', 'createdAt']),
            accessToken,
            refreshToken,
        },
    });
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    const [accessToken, refreshToken] = tokenUtility.generateTokens(username);

    await tokenUtility.saveRefreshToken(username, refreshToken);

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Generated new tokens pair.',
        data: { accessToken, refreshToken },
    });
}