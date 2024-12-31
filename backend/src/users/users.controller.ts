import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express'
import { Roles } from 'src/middleware/role.decorator';
import { Users, userTypes } from 'src/shared/schema/users';
import { decodeAuthToken } from 'src/utility/token-generator';
import { RolesGuard } from 'src/middleware/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/verify-token')
  async verifyToken(@Req() req: Request) {

    const token = req.cookies._digi_auth_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException()
    }
    const user = decodeAuthToken(token)
    console.log('verify user ===>')

    return {
      success: true,
      result: user
    }
  }

  @Get('/is-admin')
  async verifyAdmin(@Req() req: Request) {
    const token = req.cookies._digi_auth_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException()
    }
    const user: any = decodeAuthToken(token)
    console.log('is admin user ===>')
    if (user.type !== userTypes.ADMIN) {
      throw new UnauthorizedException()
    }
    return {
      success: true,
      result: user.type === userTypes.ADMIN
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK) // 200 status code
  async login(
    @Body() loginUser: { email: string, password: string },
    @Res({ passthrough: true }) response: Response
  ) {
    const loginRes = await this.usersService.login(loginUser.email, loginUser.password)
    if (loginRes.success) {

      response.cookie('_digi_auth_token', loginRes.result?.token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * 24 * 60 * 60 * 1000 })
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

  @Post('/forgot-password')
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
    console.log('id===>', user._id, id)
    if (user._id !== id) {
      throw new UnauthorizedException()
    }
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


  // Wishlist
  @Get('/wishlist')
  async getWishlist(@Req() req: any) {
    const user: Users = req.user;
    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      result: {
        wishlist: user.wishlist
      }
    }
  }

  @Post('/wishlist')
  async addToWishlist(
    @Req() req: any,
    @Body('productId') productId: string,
    @Body('skuId') skuId: string,
  ) {
    const user: Users = req.user;

    console.log('wishlist post user===>',user)
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersService.addToWishlist(user, productId, skuId);
  }

  @Delete('/wishlist')
  async removeFromWishlist(
    @Req() req: any,
    @Body('productId') productId: string,
    @Body('skuId') skuId: string,
  ) {
    const user: any = req.user;
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersService.removeFromWishlist(user, productId, skuId);
  }
}
