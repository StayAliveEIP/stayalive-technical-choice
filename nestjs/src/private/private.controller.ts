import {Controller, Get, HttpCode, HttpStatus} from "@nestjs/common";
import {ApiTags } from "@nestjs/swagger";
import {PrivateService} from "./private.service";

@Controller('private')
@ApiTags('private')
export class PrivateController {

    constructor(private readonly appService: PrivateService) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    privateRouteGet(): { message: string } {
        return (this.appService.getPrivateRoute());
    }

}