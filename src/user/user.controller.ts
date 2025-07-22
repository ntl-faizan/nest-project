import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  // GET /users/active
  @Get('active')
  getActiveUsers() {
    return this.userService.findActiveUsers();
  }
}
