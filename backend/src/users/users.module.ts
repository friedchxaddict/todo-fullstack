import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UsersEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
