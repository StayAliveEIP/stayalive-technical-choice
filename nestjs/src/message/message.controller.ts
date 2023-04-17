import {Body, Controller, Get, HttpCode, Param, Post, Query, Req} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import PostMessageBody from "../body/PostMessageBody";
import {Request} from "express";
import {MessageService} from "./message.service";

interface IMessagePostBody {
    message: string
}

@Controller('message')
@ApiTags('message')
export class MessageController {

    constructor(private readonly appService: MessageService) {}

    @Post('/post-message')
    @HttpCode(200)
    @ApiOperation({ summary: 'Post the message' })
    @ApiBody({ description: 'The message to resend', type: PostMessageBody })
    postHello(@Body() body: PostMessageBody): { message: string } {
        return (this.appService.postMessage(body.message));
    }

    @Get('/query-message')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get the message from the query' })
    @ApiQuery({ name: 'message', description: 'The message to resend', type: String })
    getQueryMessage(@Query() body: IMessagePostBody): { message: string } {
        return (this.appService.queryMessage(body.message));
    }

    @Get('/param-message/:message')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get the message from the param' })
    @ApiParam({ name: 'message', description: 'The message to resend', type: String })
    getHello(@Param() params: string): { message: string } {
        return (this.appService.getParamHello(params));
    }

    @Get('/cookie-message')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get the message from the cookie' })
    getCookieMessage(@Req() request: Request): { message: string } {
        return (this.appService.getCookieMessage(request));
    }

}