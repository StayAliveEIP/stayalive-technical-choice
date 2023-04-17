import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization)
            throw new UnauthorizedException('No authorization header provided');
        const token = req.headers.authorization;
        if (token == 'password')
            return (next());
        throw new UnauthorizedException('Wrong password');
    }
}