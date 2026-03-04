import { Provider, Gender } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('password123', salt);

export const userSeeds = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'A hard-working individual.',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: hashedPassword,
    gender: Gender.FEMALE,
    provider: Provider.LOCAL,
    description: 'Enjoys healthy habits.',
  },
  {
    username: 'bob_builder',
    email: 'bob@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'Can we fix it? Yes we can!',
  },
  {
    username: 'alice_wonder',
    email: 'alice@example.com',
    password: hashedPassword,
    gender: Gender.FEMALE,
    provider: Provider.LOCAL,
    description: 'Curiouser and curiouser.',
  },
  {
    username: 'charlie_brown',
    email: 'charlie@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'Good grief!',
  },
  {
    username: 'david_beckham',
    email: 'david@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'Bend it like Beckham.',
  },
  {
    username: 'eva_green',
    email: 'eva@example.com',
    password: hashedPassword,
    gender: Gender.FEMALE,
    provider: Provider.LOCAL,
    description: 'Passionate about cinema.',
  },
  {
    username: 'frank_ocean',
    email: 'frank@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'Blonde.',
  },
  {
    username: 'grace_hopper',
    email: 'grace@example.com',
    password: hashedPassword,
    gender: Gender.FEMALE,
    provider: Provider.LOCAL,
    description: 'Pioneer of computer programming.',
  },
  {
    username: 'harry_potter',
    email: 'harry@example.com',
    password: hashedPassword,
    gender: Gender.MALE,
    provider: Provider.LOCAL,
    description: 'The boy who lived.',
  },
];
