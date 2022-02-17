import { CookieOptions, Request, Response } from 'express';
import config from 'config';

import {
  createUserSession,
  updateUserSession,
  getUserSession,
} from '../service/session.service';
import {
  validatePassword,
  getGoogleOauthTokens,
  getGoogleUser,
  findAndUpdateUser,
} from '../service/user.service';
import { signJWT } from '../utils/jwt.utils';
import { CreateSessionInput } from '../schema/session.schema';
import log from '../../src/utils/logger';

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export const createUserSessionHandler = async (
  request: Request<{}, {}, CreateSessionInput['body']>,
  response: Response
) => {
  // Validate the User's password
  const user = await validatePassword(request.body);

  if (!user) {
    return response.status(401).send('Invalid email or password');
  }

  // Create Session
  const session = await createUserSession(
    user._id,
    request.get('user-agent') || ''
  );

  // Create an access token

  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>('accessTokenTTL'), // 15 minutes
    }
  );

  response.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  // Create a refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>('refreshTokenTTL'), // 1 Year
    }
  );

  response.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1 Year
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  // Return access and refresh token
  return response.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user;

  const sessions = await getUserSession({ user: user._id, valid: true });

  return response.send(sessions);
};

export const deleteUserSessionHandler = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user;

  if (!user) {
    return response.sendStatus(403);
  }

  await updateUserSession({ _id: user.session }, { valid: false });

  response.cookie('accessToken', null, {
    maxAge: 3.154e10, // 1 Year
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  response.cookie('refreshToken', null, {
    maxAge: 3.154e10, // 1 Year
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  return response.send({
    accessToken: null,
    refreshToken: null,
  });
};

export const googleOauthHandler = async (
  request: Request,
  response: Response
) => {
  // get the code from qs
  const code = request.query.code as string;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOauthTokens({ code });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return response.status(403).send('Google account is not verified');
    }

    // Upsert the user
    const user = await findAndUpdateUser(
      { email: googleUser.email },
      {
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
      },
      { upsert: true, new: true }
    );

    // Create Session
    const session = await createUserSession(
      user?._id,
      request.get('user-agent') || ''
    );

    // Create an access token

    const accessToken = signJWT(
      {
        ...user?.toJSON(),
        session: session._id,
      },
      {
        expiresIn: config.get<string>('accessTokenTTL'), // 15 minutes
      }
    );

    // Create a refresh token
    const refreshToken = signJWT(
      {
        ...user?.toJSON(),
        session: session._id,
      },
      {
        expiresIn: config.get<string>('refreshTokenTTL'), // 1 Year
      }
    );

    // set cookies
    response.cookie('accessToken', accessToken, accessTokenCookieOptions);

    response.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    response.redirect(config.get('origin'));
  } catch (error: any) {
    log.error(error, 'Failed to authorize Google user');
    return response.redirect(`${config.get('origin')}/oauth/error`);
  }
};
