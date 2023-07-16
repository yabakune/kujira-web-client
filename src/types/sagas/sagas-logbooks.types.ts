export type FetchLogbookPayload = {
  logbookId: number;
};

export type CreateLogbookPayload = {
  name: string;
  ownerId: number;
};

export type UpdateLogbookPayload = Partial<{
  name: string;
}> & { logbookId: number };

export type DeleteLogbookPayload = {
  logbookId: number;
};
