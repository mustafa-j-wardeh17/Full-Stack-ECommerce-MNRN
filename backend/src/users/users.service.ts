import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users';
import config from 'config'
import { UserRepository } from 'src/shared/repositories/user.repository';
import { generateHashPassword } from 'src/utility/password-manager';
import { sendEmail } from 'src/utility/mail-handler';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository
  ) { }

  findAll() {
    return `This action returns all users`;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // generate the hash password
      createUserDto.password = await generateHashPassword(
        createUserDto.password
      )

      //check is it for admin
      if (createUserDto.type === userTypes.ADMIN && createUserDto.secretToken !== config.get('adminSecretToken')) {
        throw new Error('Not allowed to create admin')
      } else {
        createUserDto.isVerified = true;
      }
      // check if user already exists
      const user = await this.userDB.findOne({
        email: createUserDto.email
      });

      if (user) {
        throw new Error("User already exist")
      }

      // generate the otp
      const otp = Math.floor(Math.random() * 900000) + 100000
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5) // for just 5 min

      // create the user
      const newUser = await this.userDB.create({
        ...createUserDto,
        otp,
        otpExpiryTime
      })

      if (newUser.type !== userTypes.ADMIN) {
        sendEmail(
          newUser.email,
          config.get('emailService.emailTemplates.verifyEmail'),
          'Email verification - PS_Store',
          {
            customerName: newUser.name,
            customerEmail: newUser.email,
            otp,
          }
        )
      }

      return {
        success: true,
        message: newUser.type === userTypes.ADMIN ?
          'Admin created successfully' :
          'Please activate your account by verifying your email. We have sent you an email with the otp',
        result: { email: newUser.email }
      }
    } catch (error) {
      throw error
    }
  }

  async login(email: string, password: string) {
    try {
     
    } catch (error) {
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
