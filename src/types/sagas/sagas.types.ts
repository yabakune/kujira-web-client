export type SagaPayload<Payload> = {
  type: string;
  payload: Payload;
};
