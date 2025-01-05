import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users';
import config from 'config'
import { UserRepository } from 'src/shared/repositories/user.repository';
import { comparePassword, generateHashPassword } from 'src/utility/password-manager';
import { generateAuthToken } from 'src/utility/token-generator';
import { MailerService } from 'src/middleware/mailer';
import { SubscriberRepository } from 'src/shared/repositories/subscriber.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(SubscriberRepository) private readonly subsicriberDb: SubscriberRepository
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
        try {
          await this.mailer.sendMail({
            to: [{ name: newUser.name, address: newUser.email }], // Recipient's email
            subject: 'Email verification - PS_Store', // Email subject
            html: `
              <p>Dear ${newUser.name},</p>
              <p>Thank you for registering at PS_Store. Please use the following OTP to verify your email:</p>
              <h2>${otp}</h2>
              <p>This OTP will expire in 5 minutes.</p>
              <p>Best regards,</p>
              <p>The PS_Store Team</p>
            `, // Email body
          });

          console.log('Verification email sent successfully');
        } catch (error) {
          console.error('Failed to send verification email:', error);
          throw new Error('Could not send verification email');
        }
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

      const token = await generateAuthToken(userExists._id as string, userExists.email, userExists.type)
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
      await this.mailer.sendMail({
        to: [{ name: user.name, address: user.email }], // Recipient's email
        subject: 'Email verification - PS_Store', // Email subject
        html: `
          <p>Dear ${user.name},</p>
          <p>Thank you for registering at PS_Store. Please use the following OTP to verify your email:</p>
          <h2>${otp}</h2>
          <p>This OTP will expire in 5 minutes.</p>
          <p>Best regards,</p>
          <p>The PS_Store Team</p>
        `, // Email body
      });
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
      // Send email with the new password
      await this.mailer.sendMail({
        to: [{ name: user.name, address: user.email }],
        subject: 'Forgot password - PS_Store',
        html: `
        <p>Dear ${user.name},</p>
        <p>We received a request to reset your password. Your temporary password is:</p>
        <h2>${tempPassword}</h2>
        <p>Please use the link below to log in and update your password:</p>
        <a href="${config.get('loginLink')}" target="_blank">Login Here</a>
        <p>Best regards,</p>
        <p>The PS_Store Team</p>
  `,
      });
      return {
        success: true,
        message: 'Password sent to your email successfully',
        result: null
      }
    } catch (error) {
      throw error
    }
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

  async findAll(type: string) {
    try {
      const users = await this.userDB.findMany({ type })
      return {
        success: true,
        result: { users }
      }
    } catch (error) {
      throw error
    }
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Wishlist
  async addToWishlist(user: any, productId: string, skuId: string) {
    let userRow = await this.userDB.findById(user._id)

    const exists = user.wishlist.some(
      (item) =>
        item.productId === productId && item.skuId === skuId,
    );

    if (!exists) {
      userRow.wishlist.push({ productId, skuId });
      await userRow.save();
    }

    return {
      message: 'Product added successfully to wishlist',
      success: true,
      result: {
        wishlist: userRow.wishlist
      }
    }
  }

  async removeFromWishlist(user: any, productId: string, skuId: string) {

    console.log('wishlist delete user===>', productId, skuId)
    const wishlist = await this.userDB.removeSingleWishlistItem(user._id, productId, skuId);
    return {
      message: 'Product removed successfully to wishlist',
      success: true,
      result: wishlist
    }
  }

  async removeSelectedItemsFromWishlist(user: any, selectedItems: { productId: string, skuId: string }[]) {
    const wishlist = await this.userDB.removeMultipleWishlistItems(user._id, selectedItems);
    return {
      message: 'Product removed successfully to wishlist',
      success: true,
      result: {
        wishlist
      }
    }
  }



  async addSubscriber(email: string) {
    console.log('Adding Email:', email);
    await this.subsicriberDb.addSubscriber(email);
    return { message: 'Subscriber added successfully.' };

  }

  async getSubscriberByEmail(email: string) {
    return this.subsicriberDb.getSubscriberByEmail(email);
  }

  async deleteEmailSubscriber(email: string) {
    console.log('Deleting Email:', email);
    const isDeleted = await this.subsicriberDb.deleteEmailSubscriber(email);
    if (!isDeleted) {
      throw new BadRequestException(`Subscriber with email ${email} not found.`);
    }
    return { message: 'Subscriber deleted successfully.' };
  }
}
