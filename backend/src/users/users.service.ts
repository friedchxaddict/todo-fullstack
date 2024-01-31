import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users = [];
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(user: { name: string; email: string }) {
    return user;
  }
}
