import jwt from 'jsonwebtoken';
import { supabase } from '~/infra/SupabaseAdapter';
import { PasswordHasherHelper } from '~/server/helper/PasswordHasherHelper';
import { UserDto } from '..';

type ProfileType = 'superadmin' | 'admin' | 'user';
export class SignInService {
    public async login(user: UserDto): Promise<{ token: string }> {
      try {
      const validUser = await this.getValidUser(user);
      return { token: this.generateToken(validUser) };
    } catch (error) {
      throw Error('Invalid credentials');
    }
  }

  private async getValidUser(user: UserDto): Promise<UserDto> {
    const existUser = await supabase.from('users').select('*').eq('username', user.username).single();
    if (existUser.error) throw Error('User not found');

    const isValidPassword = PasswordHasherHelper.verifyPassword(user.password || '', existUser.data.password);
    if (!isValidPassword) throw Error('Invalid password');

    return { id: existUser.data.id, username: existUser.data.username, profile: existUser.data.profile };
  }

  generateToken(user: UserDto): string {
    const userInformation = { userId: user.id, username: user.username, profile: user.profile }
    const jwtSecret = useRuntimeConfig().jwtSecret;
    return jwt.sign(userInformation, jwtSecret, { expiresIn: '24h' });
  }

  public validateToken(token: string): boolean {
    const jwtSecret = useRuntimeConfig().jwtSecret;

    try {
      const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) return false
      
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
