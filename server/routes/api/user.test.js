const config = require("../../../config"),
  axios = require("axios"),
  querystring = require("querystring");

let resetPassword = "";

// @flow
it("User can be created", async () => {
  try {
    const result = await axios.post(
      `${config.API_URL}:${config.httpPort}/api/user/registrate`,
      querystring.stringify({
        email: "sampled@topclass.kz",
        password: "qwe123"
      })
    );
    return expect(result.status).toBe(200);
  } catch (e) {
    const { response } = e;
    return expect(response.status).toEqual(409);
  }
});

it("User's password can be reset", async () => {
  try {
    const result = await axios.post(
      `${config.API_URL}:${config.httpPort}/api/user/reset`,
      querystring.stringify({
        email: "sampled@topclass.kz",
        test: true
      })
    );
    resetPassword = result.data.password;
    return expect(result.status).toBe(200);
  } catch (e) {
    const { response } = e;
    return expect(response.status).toEqual(400);
  }
});

it("Should delete User", async () => {
  expect.assertions(1);

  const { data } = await axios.post(
    `${config.API_URL}:${config.httpPort}/api/user/login`,
    querystring.stringify({
      email: "sampled@topclass.kz",
      password: resetPassword
    })
  );

  const { token } = data;

  const deleteUser = await axios.post(
    `${config.API_URL}:${config.httpPort}/api/user/delete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(deleteUser.status).toBe(204);
});
