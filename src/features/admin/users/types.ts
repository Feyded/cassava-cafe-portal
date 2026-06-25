export interface CreateUserDto {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
}
