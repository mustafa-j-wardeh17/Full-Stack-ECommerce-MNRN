import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK) // 200 status code
  async login(
    @Body() loginUser: { email: string, password: string },
    @Res({ passthrough: true }) response: Response
  ) {
    const loginRes = await this.usersService.login(loginUser.email, loginUser.password)
    if (loginRes.success) {
      response.cookie('_digi_auth_token', loginRes.result?.token), { httpOnly: true }
    }

    delete loginRes.result?.token;
    return loginRes
  }

  @Get('/verify-email/:otp/:email')
  async verifyEmail(
    @Param("otp") otp: string,
    @Param("email") email: string,
  ) {
    return await this.usersService.verifyEmail(otp, email)
  }

  @Get('/send-otp-email/:email')
  async sendOtpEmail(@Param('email') email: string) {
    return await this.usersService.sendOtpEmail(email)
  }


  @Put('/logout')
  async logout(@Res() response: Response) {

    response.clearCookie('_digi_auth_token');

    return response.status(HttpStatus.OK).json(
      {
        success: true,
        message: 'Logout successfully'
      }
    )
  }

  @Get('/forgot-password')
  async forgotPassword(@Body() forgotPassword: { email: string }) {
    return await this.usersService.forgotPassword(forgotPassword.email)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
