const { addUserController } = require("../../controllers/auth");
const Users = require("../../database/schemas/Users");
const { hashPassword } = require("../../utilities/helpers");

jest.mock("../../database/schemas/Users");
jest.mock("../../utilities/helpers", () => ({
  hashPassword: jest.fn((x) => x),
}));

const mockReq = {
  body: {
    name: "Wade",
    password: "maximumeffort",
  },
};

const mockRes = {
  status: jest.fn(() => mockRes),
  send: jest.fn(),
};

it("sends a status of 400 and a message if user already exist", async () => {
  Users.findOne.mockImplementationOnce(() => ({
    id: 19,
    name: "Someone",
    password: "something",
  }));

  await addUserController(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(400);
  expect(mockRes.send).toHaveBeenCalledWith({ message: "User already exist" });
});

it("sends a status of 201 and a message when creating a new user", async () => {
  Users.findOne.mockResolvedValueOnce(undefined);
  Users.create.mockResolvedValueOnce({
    id: 19,
    name: "Someone",
    password: "something",
  });

  await addUserController(mockReq, mockRes);

  expect(hashPassword).toHaveBeenCalledWith("maximumeffort");
  expect(Users.create).toHaveBeenCalledWith({
    name: "Wade",
    password: "maximumeffort",
  });
  expect(mockRes.status).toHaveBeenCalledWith(201);
});
