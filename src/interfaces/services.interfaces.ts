import { User, EditUserProfilePayload } from './../schema/user.schema';

export interface AuthServicePayload {
  userExistence: (type: string, email: string) => Promise<void>;
  verify: (email: string) => Promise<User>;
  verifyCode: (email: string, code: string) => Promise<User>;
}

export interface UserServicePayload {
  storeUser: (body: EditUserProfilePayload, userId: number) => Promise<void>;
}
