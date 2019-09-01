import { User } from './user.model';

export class Dog {
  _id?: string;
  breed: string;
  name: string;
  gender: string;
  age: number;
  isAdopted: boolean;
  profile_image: String;
  description: String;
  owner: User;

  constructor() {
    this.breed = "";
    this.name = "";
    this.gender = "";
    this.age = 0;
    this.profile_image = "";
    this.isAdopted = false;
    this.owner = {
      fullName : "",
      email : "",
      phoneNumber : "",
      address: {
        country: "",
        city: "",
        street: "",
        number: 0
      }
    }
  }
}
