import type { User } from "./user";

export type UpdateUserPayload = Partial<Omit<User, "id">>;
