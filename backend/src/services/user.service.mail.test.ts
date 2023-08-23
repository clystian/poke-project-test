// user.service.test.ts
import { createUser, verifyEmail } from '../services/user.service';
import { User } from '../models/user.model';
import mongoose from 'mongoose';
import { DB_URI } from '../config';

// Mocking the sendVerificationEmail function to avoid sending real emails
jest.mock('../services/email.service', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
}));

describe('User Registration and Verification - Integration Test', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(DB_URI);
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  it('should create a user and then verify the email', async () => {
    const username = 'pokeuser';
    const email = 'mailtrap@yopmail.com';
    const password = 'Server.1';

    // Create the user
    const user = await createUser(username, email, password);
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.isVerified).toBe(false);

    // Verify the email
    await verifyEmail(user.verifyToken ?? ""); // Assuming verifyToken is accessible

    // Fetch the user again to check if it's verified
    const verifiedUser = await User.findById(user._id);
    expect(verifiedUser?.isVerified).toBe(true);

    // Clean up: delete the test user
    // await User.findByIdAndDelete(user._id);
  });
});

