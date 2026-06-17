import type { User } from "./user";

export type CreateUserPayload = {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  role: string;
  is_active: boolean;
  email: string;
  password: string;
};

export type UpdateUserPayload = Partial<Omit<User, "id">>;
