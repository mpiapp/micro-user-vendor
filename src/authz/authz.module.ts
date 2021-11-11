import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorUser, VendorUserSchema } from 'src/vendor/schema/vendor.schema';
import { VendorService } from 'src/vendor/vendor.service';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([{ name: VendorUser.name, schema: VendorUserSchema }])],
    providers: [VendorService]
})
export class AuthzModule {}
