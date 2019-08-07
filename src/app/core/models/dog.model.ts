import { User } from './user.model';

export interface Dog {
  type: string;
  name: string;
  gender: string;
  age: number;
  owner: User;
}
