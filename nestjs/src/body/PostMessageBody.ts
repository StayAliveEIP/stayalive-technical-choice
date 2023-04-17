import { ApiProperty } from "@nestjs/swagger";

export default class {

    @ApiProperty({
        description: 'The message to resend',
        type: String
    })
    message: string;

}