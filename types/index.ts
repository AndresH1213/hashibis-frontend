import { User, Session } from 'next-auth';
import { Identity } from './token';
import {
  ProductInterface,
  ProductForm,
  ProductFormActions,
  ImageInterface,
} from './product';
import {
  CannabisUsageQuestionFields,
  MedicalQuestionFields,
  MedicalUserData,
  MentalHealthQuestionFields,
} from './medicalHistory';
import { PersonalUserData } from './personalInformation';

export enum Providers {
  COGNITO = 'cognito',
  GOOGLE = 'cognito_google',
  FACEBOOK = 'cognito_facebook',
}

export interface SignUpParams {
  email: string;
  givenName: string;
  familyName: string;
  password: string;
  secretHash: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  liked_products?: ProductInterface[];
  [x: string]: any;
}

export interface Profile {
  at_hash: string;
  sub: string;
  'cognito:groups'?: string[];
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  given_name?: string;
  nonce: string;
  picture?: string;
  origin_jti: string;
  aud: string;
  identities?: Identity[];
  token_use: string;
  auth_time: number;
  nickname?: string;
  name?: string;
  exp: number;
  iat: number;
  family_name?: string;
  jti: string;
  email: string;
}

export interface SessionInterface extends Session {
  token?: string;
  user: User & {
    username: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    gender?: string;
    birthDay?: string;
    isAdmin: boolean;
  };
}

export interface RegisterForm {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  confirmPassword: string;
}

export type { ProductInterface, ProductForm, ImageInterface };
export { ProductFormActions };
export type {
  CannabisUsageQuestionFields,
  MedicalQuestionFields,
  MentalHealthQuestionFields,
  MedicalUserData,
};
export type { PersonalUserData };
