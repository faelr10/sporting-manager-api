import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository, IUserResponse, IUserService } from './structure';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}

  async createUser(params: CreateUserDto): Promise<IUserResponse> {
    const verifyExist = await this.userRepository.getUserByParams({
      email: params.email,
    });
    if (verifyExist) {
      throw new ForbiddenException('User already exists');
    }

    const newUser = await this.userRepository.createUser(params);
    if (!newUser) {
      throw new NotFoundException('User creation failed');
    }
    await this.accountService.createAccount({
      user_id: newUser.id,
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      local_name: newUser.local_name,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };
  }

  async getUserByParams(where: string): Promise<IUserResponse> {
    const user = await this.userRepository.getUserByParams({
      id: where,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      local_name: user.local_name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
