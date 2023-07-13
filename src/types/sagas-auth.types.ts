export type SagaAction<Payload> = {
  type: string;
  payload: Payload;
};

export type RegistrationAction = {
  email: string;
  username: string;
  password: string;
};

export type LoginAction = {
  email: string;
  password: string;
};

export type AuthVerificationAction = {
  email: string;
  verificationCode: string;
  thirtyDays?: boolean;
};

export type SendNewVerificationCodeAction = {
  email: string;
};

export type LogoutAction = {
  email: string;
};
