// user.service.test.ts
import { createUser, verifyEmail } from '../services/user.service';
import { User } from '../models/user.model';

// Mocking the sendVerificationEmail function
jest.mock('../services/email.service', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
}));

describe('createUser', () => {
  it('should create a user with the given details', async () => {
    const username = 'pokeuser';
    const email = 'mailtrap@yopmail.com';
    const password = 'Server.1';

    // Mocking the save function
    const saveFn = jest.fn();
    User.prototype.save = saveFn;

    const user = await createUser(username, email, password);

    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.isVerified).toBe(false);
    expect(saveFn).toHaveBeenCalled();
  }, 600000);
});

describe('verifyEmail', () => {
  it('should verify the email with the given token', async () => {
    const token = 'testtoken';

    // Mocking the findOne function
    const findOneFn = jest.fn().mockResolvedValue({
      isVerified: false,
      save: jest.fn(),
    });
    User.findOne = findOneFn;

    await verifyEmail(token);

    expect(findOneFn).toHaveBeenCalledWith({ verifyToken: token });
  });
});
