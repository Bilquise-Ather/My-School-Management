const Admin = require('../models/admin');
const UserAuth = require('../models/userAuth');
const Principal = require('../models/principal');
const Staff = require('../models/staff');
const BadError = require('../error/baderror');
const EmailNotFound = require('../error/emailnotfound');
const StaffAuth = require('../models/staffAuth');



//  ---- Admin Register ----
let adminRegister = async (req) => {
    let body = JSON.parse(req.body.body);

    if (!body.adminName || !body.email || !body.password || !body.mobileNo || !body.gender || !req.file) {
        throw new BadError("Field Missing")
    }
    let findEmail = await Admin.findOne({ where: { email: body.email }, raw: true })
    if (findEmail) {
        throw new BadError("Email already exist!")
    }
    let findMobileNo = await Admin.findOne({ where: { mobileNo: body.mobileNo }, raw: true })
    if (findMobileNo) {
        throw new BadError("Mobile No already exist!")
    }


    let newuser = {
        adminName: body.adminName,
        email: body.email,
        password: body.password,
        mobileNo: body.mobileNo,
        gender: body.gender,
        image: req.file.filename,
        isAdmin: body.isAdmin,
        isPrincipal: body.isPrincipal
    }
    let a = await Admin.create(newuser);
    let principal = (body.isPrincipal);
    if (principal === '1') {
        let checkPrincipal = await Principal.findOne({ raw: true })
        if (checkPrincipal) {
            throw new BadError("Cant have multiple principals")
        }

        let newuser = {
            adminId: a.id,
            principalName: body.adminName,
            email: body.email,
            password: body.password,
            mobileNo: body.mobileNo,
            gender: body.gender,
            image: req.file.filename,
        }
        let b = await Principal.create(newuser)
        console.log(b);
    }
    let authtoken = { token: Math.random(10), adminId: a.id, isPrincipal: a.isPrincipal }
    let b = await UserAuth.create(authtoken);
    return { b: b.token };
}


//  ---- Admin Login ----
let adminLogin = async (req) => {
    if (!req.body.email) {
        throw new EmailNotFound("Please Provide Email");
    } if (!req.body.password) {
        throw new BadError("Please Provide Password");
    }

    let findData = {};

    findData["$or"] = [
        { email: { $eq: req.body.email } }
    ]

    findData["$and"] = [
        { password: { $eq: req.body.password } }
    ]

    let user = await Admin
        .findOne({ where: findData, raw: true });

    if (user === null) {
        throw new BadError('Invalid user')
    }

    let authtoken = Math.random(10)
    let b = await UserAuth.update({ token: authtoken }, { where: { adminId: user.id }, raw: true })
    let c = await UserAuth.findOne({ where: { adminId: user.id }, raw: true })

    console.log(c.adminId);
    return { authtoken: authtoken, adminId: c.adminId };
}

// ---- Admin List
let getAdminList = async () => {
    let AdminList = await Admin.findAll({ raw: true });
    return { AdminList }

}


//  ---- Principal Login ----

let principalLogin = async (req) => {
    if (!req.body.email) {
        throw new EmailNotFound("Please Provide Email");
    } if (!req.body.password) {
        throw new BadError("Please Provide Password");
    }

    let findData = {};

    findData["$or"] = [
        { email: { $eq: req.body.email } }

    ]

    findData["$and"] = [
        { password: { $eq: req.body.password } }


    ]

    let user = await Admin
        .findOne({ where: findData, raw: true });
    if (user === null) {
        throw new BadError('Invalid User')
    }

    let authtoken = Math.random(10)
    let b = await UserAuth.update({ token: authtoken }, { where: { adminId: user.id } })
    let c = await UserAuth.findOne({ where: { adminId: user.id }, raw: true })
    console.log(c.adminId);
    return { authtoken: authtoken, adminId: c.adminId };

}


//  ---- Principal List
let getPrincipalList = async () => {
    let PrincipalList = await Principal.findAll({ raw: true });
    return { PrincipalList }

}

//  ---- Staff Register ----
let staffRegister = async (req) => {
    let body = JSON.parse(req.body.body);

    if (!body.firstName || !body.email || !body.password || !body.mobileNo || !body.gender || !body.status || !req.file) {
        throw new BadError("Field Missing")
    }

    let findEmail = await Staff.findOne({ where: { email: body.email }, raw: true })
    if (findEmail) {
        throw new BadError("Email already exist!")
    }
    let findMobileNo = await Staff.findOne({ where: { mobileNo: body.mobileNo }, raw: true })
    if (findMobileNo) {
        throw new BadError("Mobile No already exist!")
    }


    let staff = {

        firstName: body.firstName,
        email: body.email,
        password: body.password,
        mobileNo: body.mobileNo,
        gender: body.gender,
        image: req.file.filename,
        status: body.status,
        type: body.type,
    }

    let a = await Staff.create(staff);
    let authtoken = { token: Math.random(10), staffId: a.id, staffstatus: a.status }
    let b = await StaffAuth.create(authtoken);
    return { b: b.token };

}

//  ---- Staff Login ----
let staffLogin = async (req) => {
    if (!req.body.email) {
        throw new EmailNotFound("Please Provide Email");
    } if (!req.body.password) {
        throw new BadError("Please Provide Password");
    }

    let findData = {};

    findData["$or"] = [
        { email: { $eq: req.body.email } },
        { mobileNo: { $eq: req.body.email } },
    ]
    findData["$and"] = [
        { password: { $eq: req.body.password } },

    ]
    console.log("findData", findData)
    let user = await Staff
        .findOne({ where: findData, raw: true });

    if (user === null) {
        throw new BadError('E-mail not available')
    }

    let authtoken = Math.random(10)
    let b = await StaffAuth.update({ token: authtoken }, { where: { staffId: user.id }, raw: true })

    let c = await StaffAuth.findOne({ where: { staffId: user.id }, raw: true })
    return { authtoken: authtoken, staffId: c.staffId };
}


//  --- Update Staff
let staffUpdate = async (id, req) => {

    let body = JSON.parse(req.body.body);

    let updateDetails = {
        firstName: body.firstName,
        email: body.email,
        mobileNo: body.mobileNo,
        password: body.password,
        gender: body.gender,
        image: req.file.filename,
        status: body.status,
        type: body.type,
    }
    return await Staff.update(updateDetails, { where: { id: id } });

}


// ----Get Staff List
let getStaffList = async () => {
    let StaffList = await Staff.findAll({ raw: true });
    let storeId = await Staff.findOne({ raw: true });
    return { StaffList: StaffList, staffId: storeId.id }

}

let getStaffById = async (id) => {
    let updateStaff = await Staff.findOne({ where: { id: id }, raw: true });
    return { updateStaff }

}


//  ----Get Staff List
let getStaffPage = async (req) => {
    let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
    let page = req.query.page || 1;
    let offset = (page - 1) * limit;
    return Staff.findAll({ raw: true, attributes: ["id", "name", "email", "password", "mobileNo", "gender", "status", "type"], limit, offset });
}


//  ---Delete Staff
let deleteStaff = async (id) => {
    let deleteStaff = await Staff.destroy({ where: { id: id }, raw: true });
    await StaffAuth.destroy({ where: { staffId: id }, raw: true })
}

let deletePrincipal = async (id) => {

    let deletePrincipal = await Principal.findOne({ where: { id: id }, raw: true });
    let del = await Admin.destroy({ where: { id: deletePrincipal.adminId } })
    let deleteAll = await UserAuth.destroy({ where: { adminId: deletePrincipal.adminId }, raw: true })
    let deletePrincipal1 = await Principal.destroy({ where: { id: id }, raw: true });
    return { deletePrincipal, del, deleteAll, deletePrincipal1 }
}


module.exports = { adminRegister, adminLogin, getAdminList, principalLogin, getPrincipalList, staffRegister, staffLogin, staffUpdate, getStaffList, getStaffById, getStaffPage, deleteStaff, deletePrincipal }
