import {Injectable} from "@nestjs/common";

@Injectable()
export class PrivateService {

    getPrivateRoute() {
        return {message: "You are on the private route ! GG !"};
    }

}