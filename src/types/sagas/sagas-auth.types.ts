export type RegistrationPayload = {
  email: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthVerificationPayload = {
  email: string;
  verificationCode: string;
  thirtyDays?: boolean;
};

export type SendNewVerificationCodePayload = {
  email: string;
};

export type RequestPasswordResetPayload = {
  email: string;
};

export type VerifyPasswordResetRequestPayload = {
  email: string;
  verificationCode: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export type LogoutPayload = {
  userId: number;
};
