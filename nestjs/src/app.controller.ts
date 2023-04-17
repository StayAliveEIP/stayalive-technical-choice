import {Body, Controller, Get, Param, Post, Query, Req} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiBody, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import PostMessageBody from "./body/PostMessageBody";
import {Request} from "express";

interface IMessagePostBody {
  message: string
}

@Controller()
@ApiTags()
export class AppController {



}

