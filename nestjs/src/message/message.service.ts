import {BadRequestException, Injectable} from "@nestjs/common";
import {Request} from "express";

@Injectable()
export class MessageService {

    getParamHello(params: any): {message: string} {
        if (params.message)
            return { message: params.message };
        throw (new BadRequestException('No message provided'));
    }

    postMessage(message: string): {message: string} {
        return { message: message };
    }

    queryMessage(message: string): {message: string} {
        if (!message)
            throw (new BadRequestException('No message provided'));
        return { message: message };
    }

    getCookieMessage(request: Request) {
        if (request.cookies.message)
            return {message: request.cookies.message};
        throw (new BadRequestException('No message provided'));
    }

}