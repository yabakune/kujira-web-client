import { Currency, Theme } from "../api-models.types";

export type FetchUserPayload = {
  userId: number;
};

export type UpdateUserPayload = Partial<{
  email: string;
  username: string;
  currency: Currency;
  theme: Theme;
  mobileNumber: string;
}> & { userId: number };

export type UpdateUserPasswordPayload = {
  userId: number;
  password: string;
};

export type DeleteUserPayload = {
  userId: number;
};
