import { User } from './user.model';

export interface Dog {
  breed: string;
  name: string;
  gender: string;
  age: number;
  profileImage: String;
  owner: User;
}
