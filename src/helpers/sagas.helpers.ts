import * as Constants from "@/constants";

export function generateGatedEndpoint(
  baseEndpoint: Constants.APIRoutes,
  extendedEndpoint: string = "",
  authorizedUserId: number
): string {
  return baseEndpoint + extendedEndpoint + `?userId=${authorizedUserId}`;
}
