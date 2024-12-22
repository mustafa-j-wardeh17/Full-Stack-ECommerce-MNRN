import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "src/shared/repositories/user.repository";
import { decodeAuthToken } from "src/utility/token-generator";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository
  ) { }

  async use(req: Request | any, res: Response, next: NextFunction) {
    try {
      const token = req.cookies._digi_auth_token || req.headers.authorization?.split(' ')[1];

      console.log('Token:', token);

      if (!token) {
        throw new UnauthorizedException('Missing auth token');
      }

      const decodedData: any = decodeAuthToken(token);

      const user = await this.userDB.findById(decodedData?.id);

      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }

      user.password = undefined;
      req.user = user;
      next();
    } catch (error: any) {
      console.error('Error in middleware:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
