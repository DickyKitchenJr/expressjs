const { addUserController } = require("../../controllers/auth");
const Users = require("../../database/schemas/Users");

jest.mock("../../database/schemas/Users");

const mockReq = {
  body: {
    name: "Wade",
    password: "maximumeffort",
  },
};

const mockRes = {
    status: jest.fn(() => mockRes),
    send: jest.fn()
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
