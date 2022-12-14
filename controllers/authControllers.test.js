/**
 1. ответ должен иметь статус-код 200
 2. в ответе должен возвращаться токен
 3. в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

'response login - status 200' 
'response - token'
'response - user:{email, subscription}'
 */
const mongoose = require("mongoose");
const request = require("supertest");

const App = require("../app");
const { User } = require("../models/user");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(MONGO_URL).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("response login", async () => {
    const newUser = {
      email: "jesttest2@i.ua",
      password: "123456",
      avatarURL:
        "avatars/63970d3d589af37f7ee6295b_DF18C390-F0C9-4F42-B8BE-B4E6CEF5B1E7 2.JPG",
    };

    await User.create(newUser);

    const userLogin = {
      email: "jesttest2@i.ua",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(userLogin);
    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy(); //toByTruyhy - не важливо, яке занчення головне щоб воно було true
    expect(body.user).toHaveProperty([user.email, user.subscription]);
  });
});
