import { ArrayOfObjectVendors, SuccsessGetVendorByAuthId } from "./vendor-payload.mock"

export const VendorControllerMock = {
    // ==================================== controller ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectVendors }),
    findOne: jest.fn().mockImplementation((id) => { return SuccsessGetVendorByAuthId(id.auth_id) }),
    findOneAndUpdate: jest.fn().mockImplementation((id, dto) => { return { auth_id: id.id, ...dto } }),
}