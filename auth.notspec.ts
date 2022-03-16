// import request from 'supertest';

// import Application from '../src/app';
// import redisClient from '../src/database/redis-client';
// import DBConnector from '../src/database/connectDB';
// import prismaClient from '../src/database/prisma-client';

// const app = new Application().getApp();

// const fixture = {
//   init: async () => {
//     await prismaClient.user.create({
//       data: {
//         email: 'mrvafadar4@gmail.com',
//         active: true,
//       },
//     });
//   },
//   teardown: async () => {
//     await prismaClient.userProfile.deleteMany({});
//     await prismaClient.user.deleteMany({});
//     await redisClient.flushDb();
//   },
// };

// describe('Test EndPoints', () => {
//   beforeAll(async () => {
//     // await DBConnector.connectMySql();
//     // await DBConnector.connectRedis();
//     // await fixture.init();
//     return Promise.all([
//       DBConnector.connectMySql(),
//       fixture.init(),
//       DBConnector.connectRedis(),
//     ]);
//   });

//   describe('Test /user-exists EndPoint', () => {
//     const endpoint = '/api/v1/auth/exists-user';

//     it('check validation error, It should response 400', async () => {
//       const response = await request(app).get(endpoint);
//       expect(response.statusCode).toBe(400);
//     });

//     it('check exists user for register, It should be response 422', async () => {
//       const response = await request(app)
//         .get(endpoint)
//         .send({ type: 'register', email: 'mrvafadar4@gmail.com' });
//       expect(response.statusCode).toBe(422);
//       expect(response.body).toEqual({
//         message: 'User exists',
//         error: 'User is Exists!',
//       });
//     });

//     it('check not exists user for register, It should be response 200', async () => {
//       const response = await request(app)
//         .get(endpoint)
//         .send({ type: 'register', email: 'testuser@gmail.com' });
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toEqual({
//         message: 'Successful!',
//       });
//     });

//     it('check exists user for login, It should be response 200', async () => {
//       const response = await request(app)
//         .get(endpoint)
//         .send({ type: 'login', email: 'mrvafadar4@gmail.com' });
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toEqual({
//         message: 'Successful!',
//       });
//     });

//     it('check not exists user for login, It should be response 422', async () => {
//       const response = await request(app)
//         .get(endpoint)
//         .send({ type: 'login', email: 'testuser@gmail.com' });
//       expect(response.statusCode).toBe(422);
//       expect(response.body).toEqual({
//         error: 'User is Not Exists!',
//         message: 'User exists',
//       });
//     });
//   });

//   describe('Test /verify EndPoint', () => {
//     const endpoint = '/api/v1/auth/verify';
//     const user = {
//       email: 'rezasendemailer@gmail.com',
//     };
//     // simple success test
//     it('check validation error, it sould response 400', async () => {
//       const response = await request(app).post(endpoint);

//       expect(response.statusCode).toBe(400);
//       expect(response.body).toEqual({
//         message: 'Validation Error',
//         error: 'Email is required !',
//       });
//     });

//     it('create user when nonexists user with email', async () => {
//       const response = await request(app)
//         .post(endpoint)
//         .send({ email: user.email });

//       // check request response
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toEqual({
//         message: 'Successful!',
//         data: {
//           user_email: user.email,
//         },
//       });

//       // check stored user
//       const userIsExists = await prismaClient.user.findFirst({
//         where: {
//           email: user.email,
//         },
//       });
//       expect(userIsExists).not.toBeNull();

//       // check save user code
//       const code = await redisClient.get(user.email);
//       expect(code).not.toBeNull();
//     });
//     // expected exception
//   });

//   afterAll(async () => {
//     await fixture.teardown();
//     await DBConnector.disconnectMySql();
//     await DBConnector.disconnectRedis();
//   });
// });

it('test', () => {});
