export type ProfileType = 'superadmin' | 'admin' | 'user';

export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  profile?: ProfileType;
}
