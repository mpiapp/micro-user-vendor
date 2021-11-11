import * as dotenv from 'dotenv';
dotenv.config();

const stringId = "id"
const numberId = 1

export const StringMockId = stringId

export const MockId = {
    id: stringId
}

export const RegisterCreatePayload = {
    auth_id: "1234",
    email: "test1234@gmail.com",
    vendor_id: "123", 
    fullname: "test", 
    role_id: "00",
    status: 'ACTIVE',
    isOwner: true
}

export const RegisterCreatePayloadSuccess = {
    id: "id",
    auth_id: "1234",
    email: "test1234@gmail.com",
    vendor_id: "123", 
    fullname: "test", 
    role_id: "00",
    status: 'ACTIVE',
    isOwner: true
}

export const SuccsessUpdateVendor = (id) => {
    return {
        auth_id: id.auth_id,
        email: "test1234@gmail.com",
        vendor_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    }
}

export function SuccsessGetVendorByAuthId(auth_id){
    return {
        auth_id: auth_id.auth_id,
        email: "test1234@gmail.com",
        vendor_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    }
}

export const ArrayOfObjectVendors = [
    {
        id: "id1",
        auth_id: "1234",
        email: "test1234@gmail.com",
        vendor_id: "123", 
        fullname: "test", 
        role_id: "00",
        status: 'ACTIVE',
        isOwner: true
    },
    {
        id: "id2",
        auth_id: "12345",
        email: "test12345@gmail.com",
        vendor_id: "1234", 
        fullname: "test12", 
        role_id: "001",
        status: 'ACTIVE',
        isOwner: false
    },
    {
        id: "id3",
        auth_id: "12341",
        email: "test12341@gmail.com",
        vendor_id: "1231", 
        fullname: "test12", 
        role_id: "002",
        status: 'ACTIVE',
        isOwner: false
    }
]

export const TrueRegisterPayload = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD, vendor_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadLowercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_LOWERCASE, flag: 'BUYER', vendor_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadUppercasePass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_UPPERCASE, flag: 'BUYER', vendor_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadNoNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_NO_NUMBER, flag: 'BUYER', vendor_id: "123", fullname: "test", role_id: "00" }
export const FalseRegisterPayloadOnlyNumberPass = { email: 'test123@gmail.com', password: process.env.MOCK_PASSWORD_ONLY_NUMBER, flag: 'BUYER', vendor_id: "123", fullname: "test", role_id: "00" }
export const EmailPayload = { email: 'test1234@gmail.com' }