import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/user.repository';
import { IUserRepository } from 'src/user/structure';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LoginDto): Promise<any> {
    const verifyExist = await this.userRepository.getUserByParams({
      email: params.email,
    });
    if (!verifyExist) {
      throw new ForbiddenException('User not found');
    }

    if (verifyExist.password !== params.password) {
      throw new ForbiddenException('Invalid password');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = this.jwtService.sign(
      { email: params.email, id: verifyExist.id },
      {
        secret,
        expiresIn: '30s',
      },
    );

    const refresh_token = this.jwtService.sign(
      { email: params.email, id: verifyExist.id },
      {
        secret,
        expiresIn: '7d',
      },
    );

    return {
      email: verifyExist.email,
      id: verifyExist.id,
      token,
      refresh_token,
    };
  }
}
