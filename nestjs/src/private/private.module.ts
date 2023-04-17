import {MiddlewareConsumer, Module} from "@nestjs/common";
import {PrivateService} from "./private.service";
import {PrivateController} from "./private.controller";
import {AuthMiddleware} from "../middleware/auth.middleware";

@Module({
    imports: [],
    controllers: [PrivateController],
    providers: [PrivateService],
})
export class PrivateModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PrivateController);
    }

}