import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

export class VendorUserRegisterDTO {

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    @IsIn(['BUYER', 'VENDOR'])
    flag: string
}