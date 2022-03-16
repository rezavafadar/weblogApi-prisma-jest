import { ExceptionError } from '../../../src/exception/exceptionError';
import AuthService from '../../../src/components/auth/auth.service';
import { User } from '@prisma/client';
import AuthDal from '../../../src/components/auth/auth.DAL';
import emailservice from '../../../src/services/email/emailSender';

jest.mock('../../../src/components/auth/auth.DAL');
jest.mock('../../../src/services/email/emailSender');

const authDal = jest.mocked(new AuthDal(), true);
const emailService = jest.mocked(new emailservice({}), true);
const authService = new AuthService(authDal, emailService);

describe('- Auth Service', () => {
  const fakeUserData: User = {
    active: false,
    email: 'mrvafadar4@gmail.com',
    id: 17,
  };
  authDal.getUserByEmail.mockReturnValue(Promise.resolve(fakeUserData));
  authDal.createUser.mockReturnValue(Promise.resolve(fakeUserData));

  describe('-- Verify Method', () => {
    it("Given a invalid email, Should throw a 'Validation Error!'", () => {
      return expect(authService.verify(undefined)).rejects.toThrow(
        new ExceptionError('Validation Error', 400, 'Email is required !'),
      );
    });

    it('Given a unregistered email, Should return a new user', async () => {
      authDal.getUserByEmail.mockReturnValueOnce(null);

      const response = await authService.verify('mrvafadar4@gmail.com');
      expect(authDal.createUser.mock.calls[0][0]).toBe(fakeUserData.email);
      expect(response).toEqual(fakeUserData);
    });

    it('Given a registered email, Should return a user', async () => {
      const response = await authService.verify(fakeUserData.email);
      expect(authDal.createUser.mock.calls.length).toBe(1);
      expect(response).toEqual(fakeUserData);
    });

    it("Given a registered email that has a verification code,Should throw a 'Code Exists' error", async () => {
      authDal.getCodeByEmail.mockReturnValueOnce(Promise.resolve('kh'));

      return expect(authService.verify(fakeUserData.email)).rejects.toThrow(
        new ExceptionError(
          'Code Exists!',
          401,
          'Your code is not expire! Please try again later.',
        ),
      );
    });

    it('Given correct values, Should call the setCodeByEmail function', async () => {
      await authService.verify(fakeUserData.email);

      expect(authDal.setCodeByEmail.mock.calls.length).toBe(1);
      expect(authDal.setCodeByEmail.mock.calls[0][0]).toBe(fakeUserData.email);
    });
  });

  describe('-- VerifyCode Method', () => {
    const fakeUser = { email: 'mmdreza@gmail.com', code: 'a102012' };

    it("Given a Invalid email and code, Should throw a 'Validation Error'", () => {
      const errorException = new ExceptionError(
        'Validation Error',
        400,
        'Verify Code is required!',
      );
      return expect(
        authService.verifyCode(undefined, undefined),
      ).rejects.toThrow(errorException);
    });

    it("Given a unregistered email, Should throw a 'Authentication!' error", () => {
      authDal.getUserByEmail.mockReturnValueOnce(null);
      return expect(
        authService.verifyCode(fakeUser.email, fakeUser.code),
      ).rejects.toThrow(
        new ExceptionError('Authentication!', 401, 'User is not Exists!'),
      );
    });

    it("Given a email that has not verification code, Should throw a 'Unauthorized!' error", () => {
      authDal.getCodeByEmail.mockReturnValueOnce(null);

      const rejectResponse = new ExceptionError(
        'Unauthorized!',
        401,
        'Code is not define or expired!',
      );

      return expect(
        authService.verifyCode(fakeUser.email, fakeUser.code),
      ).rejects.toThrow(rejectResponse);
    });

    it("Given a invalid verification code, Should throw a 'Verify Code is..' error", () => {
      authDal.getCodeByEmail.mockReturnValueOnce(Promise.resolve('m12534'));

      const rejectResponse = new ExceptionError(
        'Unauthorized!',
        401,
        'Verify code is incorrect!',
      );

      return expect(
        authService.verifyCode(fakeUser.email, fakeUser.code),
      ).rejects.toThrow(rejectResponse);
    });

    it("Given correct value, Should call the 'deleteCodeByEmail' function", async () => {
      authDal.getCodeByEmail.mockReturnValueOnce(
        Promise.resolve(fakeUser.code),
      );

      await authService.verifyCode(fakeUser.email, fakeUser.code);

      expect(authDal.deleteCodeByEmail.mock.calls.length).toBe(1);
      expect(authDal.deleteCodeByEmail.mock.calls[0][0]).toBe(fakeUser.email);
    });
  });
});
