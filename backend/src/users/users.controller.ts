import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Put, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'
import { Roles } from 'src/middleware/role.decorator';
import { userTypes } from 'src/shared/schema/users';
import { decodeAuthToken } from 'src/utility/token-generator';

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
      // response.cookie('_digi_auth_token', loginRes.result?.token, {
      //   maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      // });
      response.cookie('_digi_auth_token', loginRes.result?.token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
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

  @Patch('/update-name-password/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    const token = req.cookies._digi_auth_token;
    if (!token) {
      throw new UnauthorizedException()
    }
    const user: any = await decodeAuthToken(token)
    if (user.id !== id) {
      throw new UnauthorizedException()
    }
    console.log('id===>', id)
    return this.usersService.updatePasswordOrName(id, updateUserDto);
  }

  @Roles(userTypes.ADMIN)
  @Get()
  findAll(@Query('type') type: string) {
    return this.usersService.findAll(type);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
