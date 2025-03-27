const { hashPassword, verifyPassword, generateToken, verifyToken } = require('../utils');
const { HttpError } = require('../errors');

class UserService{
  constructor(opts) {
    this.userRepository = opts.userRepository;
  }

  _validateData(rawData){
    const data = Object.entries(rawData)
    data.forEach(([keys, value]) => {
      if(!value) {
        throw new Error(`must provide ${keys}`)
      }
    })
    const isEmail = /^\S+@\S+\.\S+$/.test(rawData.email);
    if(!isEmail){
      throw new Error('email must follow email format')
    }
    const passwordLength = rawData.password.length;
    if(passwordLength < 6) {
      throw new Error('password must be atleast 6 character')
    }
  }

  async login(opts) {
    try {
      const userCredentials = { email: opts.email, password: opts.password };
      this._validateData(userCredentials);
      const user = await this.userRepository.get(userCredentials.email);   

      if(!user) throw new Error('incorrect email or password');

      if(!user.isVerified) throw new Error('account not verified');
      
      const isValidPassword = await verifyPassword(userCredentials.password, user.password);
      
      if(!isValidPassword) throw new Error('incorrect email or password');
      
      const accessToken = await generateToken(
        {
          user,
          jwtSecret: opts.jwtSecret,
          tokenExpiration: opts.jwtTokenLifeCycle
        }
      );
      
      const refreshToken = await generateToken(
        {
          user,
          jwtSecret: opts.jwtRefreshSecret,
          tokenExpiration: opts.jwtRefreshTokenLifeCycle
        }
      );

      return {
        accessToken,
        refreshToken
      }
      
    } catch (error) {
      console.log('failed to login', error.message)
      if(error.message === 'incorrect email or password'){
        throw new HttpError(`${error.message}`, 400);  
      } else if(error.message === 'account not verified'){
        throw new HttpError(`${error.message}`, 403);
      } else {
        throw new HttpError(`${error.message}`, 500); 
      }
    }
  }

  async register(opts) {
    try {
      const rawUserData = {
        email: opts.email,
        firstName: opts.firstName,
        password: opts.password
      }
      this._validateData(rawUserData)
      const hashedData = {
        ...rawUserData,
        lastName: opts.lastName || '',
        password: await hashPassword(opts.password)
      }
      const status = await this.userRepository.register(hashedData);

      const verificationToken = await generateToken(
        {
          user: {_id: null, email: hashedData.email},
          tokenExpiration: opts.jwtVerificationTokenLifeCycle,
          jwtSecret: opts.jwtVerificationSecret
        }
      );

      await opts.sendEmail(opts.emailApps, opts.webAppBaseUrl, opts.email, verificationToken);
  
      return status;
    } catch (error) {
      console.log('failed to register', error)
      throw new HttpError(`${error.message}`, 500);
    }
  }

  async refreshToken(token, refreshSecretKey, jwtExpiration, jwtSecretKey) {
    try {
      const decoded = await verifyToken({ token, secretKey: refreshSecretKey });
      const user = {_id: decoded.id, email: decoded.email };
      
      const newAccessToken = await generateToken({
        user,
        tokenExpiration: jwtExpiration,
        jwtSecret: jwtSecretKey,
      });

      return newAccessToken
    } catch (error) {
        throw new HttpError('Invalid or expired refresh token', 403)
    };
  }

  async verify(token, secretKey) {
    try {
      const decodedToken = await verifyToken({token, secretKey});

      const { email } = decodedToken;
      const user = await this.userRepository.get(email);

      if(!user) throw new Error('User not found');

      if(user.isVerified) throw new Error('account already verified');

      await this.userRepository.update(user._id, 'isVerified', true);

    } catch (error) {
      console.log('error from verify', error);
      
      if(error.message === 'User not found') {
        throw new HttpError(`${error.message}`, 404)
      }
      if(error.message === 'account already verified'){
        throw new HttpError(`${error.message}`, 409)
      }

      throw new HttpError('Invalid or expired verification token', 403)
    }
  }

  async reverify(opts) {
    try {
    const { email, password } = opts;
    const userCredentials = { email, password };
    this._validateData(userCredentials);
    const user = await this.userRepository.get(userCredentials.email);   

      if(!user) throw new Error('incorrect email or password');

      if(user.isVerified) throw new Error('account already verified');
      
      const isValidPassword = await verifyPassword(userCredentials.password, user.password);
      
      if(!isValidPassword) throw new Error('incorrect email or password');

      const verificationToken = await generateToken(
        {
          user: {_id: null, email: user.email},
          tokenExpiration: opts.jwtVerificationTokenLifeCycle,
          jwtSecret: opts.jwtVerificationSecret
        }
      );

      await opts.sendEmail(
        opts.emailApps,
        opts.webAppBaseUrl,
        user.email,
        verificationToken);

    } catch (error) {
      console.log('error while reverifying user', error)
      if(error.message === 'incorrect email or password'){
        throw new HttpError(`${error.message}`, 400);  
      } else if(error.message === 'account already verified'){
        throw new HttpError(`${error.message}`, 400);
      } else {
        throw new HttpError(`${error.message}`, 500); 
      }
    }
  }
};

module.exports = UserService;