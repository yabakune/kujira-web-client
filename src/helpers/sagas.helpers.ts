import * as Constants from "@/constants";

export function generateEndpoint(
  baseEndpoint: Constants.APIRoutes,
  extendedEndpoint: string = "",
  authorizedUserId?: number
): string {
  let endpoint = baseEndpoint + extendedEndpoint;

  if (authorizedUserId) {
    return endpoint + `?userId=${authorizedUserId}`;
  } else {
    return endpoint;
  }
}
