export interface User {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}
