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
            const token = req.cookies._digi_auth_token
            if (!token) {
                throw new UnauthorizedException('missing auth token')
            }

            const decodetData: any = decodeAuthToken(token)

            const user = await this.userDB.findById(decodetData?.id)

            if (!user) {
                throw new UnauthorizedException('Unauthorized')
            }
            user.password = undefined;
            req.user = user;
            next()
        } catch (error: any) {
            throw new UnauthorizedException(error.message)
        }
    }
}