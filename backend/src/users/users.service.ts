import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users';
import config from 'config'
import { UserRepository } from 'src/shared/repositories/user.repository';
import { comparePassword, generateHashPassword } from 'src/utility/password-manager';
import { sendEmail } from 'src/utility/mail-handler';
import { generateAuthToken } from 'src/utility/token-generator';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository
  ) { }



  async create(createUserDto: CreateUserDto) {
    try {
      // generate the hash password
      createUserDto.password = await generateHashPassword(
        createUserDto.password
      )

      //check is it for admin
      if (createUserDto.type === userTypes.ADMIN && createUserDto.secretToken !== config.get('adminSecretToken')) {
        throw new Error('Not allowed to create admin')
      } else if (createUserDto.type !== userTypes.CUSTOMER) {
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
      const userExists = await this.userDB.findOne({
        email
      })

      if (!userExists) {
        throw new Error('User not found')
      }

      if (!userExists.isVerified) {
        throw new Error('Please verify your email')
      }

      const isPasswordMatch = await comparePassword(password, userExists.password)
      if (!isPasswordMatch) {
        throw new Error('Invalid email or password')
      }

      const token = await generateAuthToken(userExists._id as string)
      return {
        success: true,
        message: 'Login successfull',
        result: {
          user: {
            name: userExists.name,
            email: userExists.email,
            type: userExists.type,
            id: userExists._id.toString(),
          },
          token
        }
      }
    } catch (error) {
      throw error
    }
  }

  async verifyEmail(otp: string, email: string) {
    try {
      const userExists = await this.userDB.findOne({
        email
      })
      if (!userExists) {
        throw new Error('User not found')
      }
      if (userExists.otp != otp) {
        throw new Error('Invalid otp')
      }
      if (userExists.otpExpiryTime < new Date()) {
        throw new Error('Otp expired');
      }

      userExists.isVerified = true
      await this.userDB.updateOne(
        { email },
        { isVerified: true }
      )
      return {
        success: true,
        message: 'Email verified successfully'
      }
    } catch (error) {
      throw error
    }
  }

  async sendOtpEmail(email: string) {
    try {
      const user = await this.userDB.findOne({
        email
      })

      if (!user) {
        throw new Error('User not fount')
      }
      if (user.isVerified) {
        throw new Error('Email already verified');
      }
      const otp = Math.floor(Math.random() * 900000) + 100000
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5)
      await this.userDB.updateOne(
        { email },
        {
          otp,
          otpExpiryTime
        }
      )
      sendEmail(
        user.email,
        config.get('emailService.emailTemplates.verifyEmail'),
        'Email verification - PS_Store',
        {
          cusomerName: user.name,
          cusomerEmail: user.email,
          otp
        },
      )
      return {
        success: true,
        message: 'Otp sent successfully',
        result: {
          email: user.email
        }
      }
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userDB.findOne({ email })
      if (!user) {
        throw new Error('User not fount')
      }

      let password = Math.random().toString(36).substring(2, 12);
      const tempPassword = password
      password = await generateHashPassword(password);
      await this.userDB.updateOne({
        _id: user._id
      },
        {
          password
        }
      )
      sendEmail(
        user.email,
        config.get('emailService.emailTemplates.forgotPassword'),
        'Forgot password - PS_Store',
        {
          cusomerName: user.name,
          cusomerEmail: user.email,
          newPassword: password,
          loginLink: config.get('loginLink'),
        },
      )
      return {
        success: true,
        message: 'Password sent to your email successfully',
        result: {
          email: user.email,
          password: tempPassword // delete just for test
        }
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async updatePasswordOrName(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { oldPassword, newPassword, name } = updateUserDto
      if (!name && !newPassword) {
        throw new Error("Please provide name or password")
      }

      const user = await this.userDB.findOne({ _id: id })

      if (!user) {
        throw new Error('User not found')
      }

      if (newPassword) {
        const isPasswordMatch = await comparePassword(
          oldPassword,
          user.password
        )

        if (!isPasswordMatch) {
          throw new Error('Invalid current password')
        }

        const password = await generateHashPassword(newPassword)
        await this.userDB.updateOne(
          {
            _id: id,
          },
          {
            password
          }
        )
      }
      if (name) {
        await this.userDB.updateOne(
          {
            _id: id
          },
          {
            name
          }
        )
      }

      return {
        success: true,
        message: 'User updated successfully',
        result: {
          name: user.name,
          email: user.email,
          type: user.type,
          id: user._id.toString()
        }
      }
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
