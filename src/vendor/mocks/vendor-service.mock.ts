import { ArrayOfObjectVendors, SuccsessGetVendorByAuthId } from "./vendor-payload.mock"

export const VendorServiceMock = {
    // ==================================== service ====================================
    find: jest.fn().mockImplementation(() => { return ArrayOfObjectVendors }),
    create: jest.fn().mockImplementation((dto) => { return { id: expect.any(String), ...dto } }),
    findOne: jest.fn().mockImplementation((id) => { return SuccsessGetVendorByAuthId(id.auth_id) }),
    findOneAndUpdate: jest.fn().mockImplementation((id, dto) => { return { auth_id: id.id, ...dto } }),
}