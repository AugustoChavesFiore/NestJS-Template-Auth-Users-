import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { bcrypt } from 'src/common/helpers/bcrypt';
import { UserAvatarDto } from './dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {};

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = this.usersRepository.create({...createUserDto, password: hashedPassword});
    const newUser = await this.usersRepository.save(user);
    if(!newUser) throw new BadRequestException('User not created');
    return newUser;
  };

  async findAll(): Promise<User[] | null> {
    const users = await this.usersRepository.find();
    if(!users) throw new BadRequestException('Users not found');
    return users;
  };

  async findOneById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) throw new NotFoundException('User not found');
    return user;
  };

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({email});
    return user;
  };

  async update(id: string, updateUserDto: UpdateUserDto) {
      if(updateUserDto.password) {
        updateUserDto.password = await this.hashPassword(updateUserDto.password);
      };
      const updatedUser = await this.usersRepository.update(id, updateUserDto);
      if(updatedUser.affected === 0) {
        throw new NotFoundException('User not found');
      };
  };

  async updateAvatar(id: string, userAvatarDto: UserAvatarDto) {
    const updatedUser = await this.usersRepository.update(id, userAvatarDto);
    if(updatedUser.affected === 0) {
      throw new NotFoundException('User not found');
    };
  }

  async remove(id: string) {
    const deletedUser = await this.usersRepository.update(id, {isActive: false}); // Soft delete
    if(deletedUser.affected === 0) {
      throw new NotFoundException('User not found');
    };
  };

  async hardDelete(id: string) {
    const deletedUser = await this.usersRepository.delete(id); // Hard delete
    if(deletedUser.affected === 0) {
      throw new NotFoundException('User not found');
    }
  };

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password);
  };
  
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  };




};
