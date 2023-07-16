export type SagaPayload<Payload> = {
  type: string;
  payload: Payload;
};

export type GatedRoutePayload = {
  userId: number;
};
