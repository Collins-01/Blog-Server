import { Exclude } from "class-transformer";

export interface UserModelData {
  id: number;
  email: string;
  hash: string;
  first_name: string;
  last_name: string;
  is_social_auth: boolean;
  is_email_verified: boolean;
}

export default class UserModel {
  id: number;
  email: string;
  @Exclude()
  hash: string;
  firstName: string;
  lastName: string;
  isSocialAuth: boolean;
  isEmailVerified: boolean;

  constructor(data: UserModelData) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.hash = data.hash;
    this.isSocialAuth = data.is_social_auth;
    this.isEmailVerified = data.is_email_verified;
  }
}

enum AuthType {
  email,
  google,
  facebook,
  twitter,
}
