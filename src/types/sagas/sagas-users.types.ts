import { UserModel } from "../api-models.types";
import { GatedRoutePayload } from "./sagas.types";

export type FetchUserPayload = {} & GatedRoutePayload;

export type UpdateUserPayload = Partial<
  Omit<
    UserModel,
    "id" | "emailVerified" | "createdAt" | "updatedAt" | "bugReports"
  >
> &
  GatedRoutePayload;

export type UpdateUserPasswordPayload = {
  oldPassword: string;
  newPassword: string;
} & GatedRoutePayload;

export type DeleteUserPayload = {} & GatedRoutePayload;
