import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { ArrayOfObjectVendors, EmailPayload, FalseRegisterPayloadOnlyNumberPass, FalseRegisterPayloadUppercasePass, MockId, RegisterCreatePayload, StringMockId, SuccsessGetVendorByAuthId, SuccsessUpdateVendor } from './mocks/vendor-payload.mock';
import { VendorUser } from './schema/vendor.schema';
import { VendorControllerMock } from './mocks/vendor-controller.mock';

describe('VendorController', () => {
  let controller: VendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorController],
      providers: [VendorService,{
        provide: getModelToken(VendorUser.name),
        useValue: VendorControllerMock
      }, 
    ]
    }).compile();      

    controller = module.get<VendorController>(VendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // crud
  it(`should get a list of user-vendors (Controller)`, async () => {
    expect(await controller.fetch_vendors({})).toEqual(ArrayOfObjectVendors)
  })

  it(`should get a list of user-vendors company-owner (Controller)`, async () => {
    let queries = {'vendor_id' : '123'}
    let headers = { 'vendor_company_id': '123' }

    expect(await controller.fetch_vendors_company_owner(queries, headers)).toEqual(ArrayOfObjectVendors)
  })

  it(`should not get a list of user-vendors company-owner if vendor-id wrong (Controller)`, async () => {
    let queries = {'vendor_id' : ''}
    let headers = { 'vendor_company_id': '' }

    try {
      await await controller.fetch_vendors_company_owner(queries, headers)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should update a user vendor (Controller)`, async () => {
    expect(await controller.update(MockId, RegisterCreatePayload)).toEqual(SuccsessUpdateVendor(StringMockId))
  })

  it(`should get a user vendor (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(SuccsessGetVendorByAuthId(MockId))
  })

  // register
  it(`should not register a user if all password number (Controller)`, async () => {
    try {
      await controller.register(FalseRegisterPayloadOnlyNumberPass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not register a user if all password uppercase (Controller)`, async () => {
    try {
      await controller.register(FalseRegisterPayloadUppercasePass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not register a user if all password lowercase (Controller)`, async function(){
    try {
      await controller.register(FalseRegisterPayloadUppercasePass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // login
  it(`should not login a user if email not in the system (Controller)`, async () => {
    try {
      await controller.login(FalseRegisterPayloadOnlyNumberPass)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // check-access
  it(`should not give a user access if token undefined (Controller)`, async () => {
    try {
      await controller.user_access({
        token: null
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it(`should not give a user access if token false (Controller)`, async () => {
    try {
      await controller.user_access({
        token: "false_token"
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  // change password
  it(`should send link to change password (Controller)`, async () => {
    try {
      await controller.change_password(EmailPayload)
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

});
