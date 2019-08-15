import { User } from './user.model';

export interface Dog {
  _id: string;
  breed: string;
  name: string;
  gender: string;
  age: number;
  profileImage: String;
  owner: User;
}
