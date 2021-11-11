import { Body, Controller, Post, UnauthorizedException, Headers, UseGuards, Get, Query, Param, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginAuthenticationGuard, LoginCompanyOwnerAuthenticationGuard, LoginProfileAuthenticationGuard } from '../authz/authz.guard';
import { VendorService } from './vendor.service';
import { VendorUserCreateDTO } from './dto/vendor-user-create.dto';
import { VendorUserRegisterDTO } from './dto/vendor-user-register.dto';
import { UserEmailDTO } from './dto/user-email.dto';
import { VendorUser } from './schema/vendor.schema';
import { IdDTO } from './dto/id.dto';
import { UpdateVendorUserDTO } from './dto/update-vendor-user.dto';

@Controller('vendor')
export class VendorController {

    constructor( private readonly vendorService:VendorService ){}

    @ApiCreatedResponse({ type: VendorUser, description: 'register a vendor-user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Post('register')
    async register(@Body() body: VendorUserRegisterDTO): Promise<VendorUserCreateDTO> {
        const registeredUser = await this.vendorService.register(body)

        /* istanbul ignore next */      // ignored for automatic registering user
        if( !registeredUser.error ) {
            
            let checked_company = await this.vendorService.find({ vendor_id: body['vendor_id'] })

            let userPayload: VendorUserCreateDTO = {
                auth_id: registeredUser['_id'],
                email: registeredUser['email'],
                vendor_id: body['vendor_id'],
                fullname: body['fullname'],
                role_id: body['role_id'],
                modules: body['modules'] ? body['modules'] : [],
                features: body['features'] ? body['features'] : [],
                capabilities: body['capabilities'] ? body['capabilities'] : [],
                status: 'ACTIVE',
                isOwner: checked_company.length ? false : true,
            }
            
            return this.vendorService.registerCreate(userPayload)
        }
        throw new UnauthorizedException()
    }

    @ApiOkResponse({ description: 'logined a user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
    @Post('login')
    async login(@Body() body: VendorUserRegisterDTO): Promise<any> {
        const loginedUser = await this.vendorService.login(body)

        /* istanbul ignore next */      // ignored for automatic login user
        if(!loginedUser.error) return loginedUser
        throw new UnauthorizedException()
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post('user-access')
    async user_access(@Headers() headers: object ): Promise<any> {
        const checkedAccessUserResponse = await this.vendorService.checkAccess(headers)

         /* istanbul ignore next */      // ignored for automatic login user
        if(checkedAccessUserResponse !== 'error') return checkedAccessUserResponse
        throw new UnauthorizedException()
    }

    // @UseGuards(LoginAuthenticationGuard)
    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post('change-password')
    async change_password(@Body() email: UserEmailDTO ): Promise<any> {
        return this.vendorService.changePassword(email)
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Get()
    async fetch_vendors(
        @Query() queries: any
    ): Promise<any> {
        return this.vendorService.find(queries)
    }

    @ApiOkResponse({ description: 'checked user access' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @UseGuards(LoginCompanyOwnerAuthenticationGuard)
    @Get('company-owner')
    async fetch_vendors_company_owner(
        @Query() queries: any,
        @Headers() headers: object
    ): Promise<any> {

        if( !headers['vendor_company_id'] ) throw new UnauthorizedException('Not an owner')
        
        queries['vendor_id'] = headers['vendor_company_id']
        return this.vendorService.find(queries)
    }

    @ApiOkResponse({ type: VendorUser, description: 'get a vendor user by auth_id' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'auth_id', required: true })
    @UseGuards(LoginProfileAuthenticationGuard)
    @Get(':auth_id')
    async findById(
        @Param('auth_id') id: IdDTO
    ): Promise<VendorUser> {
        return this.vendorService.findById(id)
    }

    @ApiCreatedResponse({ type: VendorUser, description: 'update a vendor user' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'auth_id', required: true })
    @UseGuards(LoginCompanyOwnerAuthenticationGuard)
    @Put(':auth_id')
    async update(
        @Param('auth_id') id: IdDTO, 
        @Body() body: UpdateVendorUserDTO
    ): Promise<VendorUser> {
        return this.vendorService.update(id, body)
    }

}
