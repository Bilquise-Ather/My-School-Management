const manager = require("../manager/manager");

let adminRegister = async (req, res, next) => {
    return manager.adminRegister(req)
        .then(data => {
            let result = {
                status: 200,
                token: data.b
            }
            return res.json(result);

        }).catch(next);
}


let adminLogin = async (req, res, next) => {
    return manager.adminLogin(req)
        .then(data => {
            let result = {
                status: 200,
                adminId: data.adminId,
                token: data.authtoken
            }
            return res.json(result);

        }).catch(next);
}


let getAdminList = async (req, res, next) => {
    return manager.getAdminList(req)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                AdminList: data.AdminList
            }
            return res.json(result);

        }).catch(next);
}

let principalRegister = async (req, res, next) => {
    return manager.adminRegister(req)
        .then(data => {
            let result = {
                status: 200,
                token: data.b
            }
            return res.json(result);

        }).catch(next);
}



let principalLogin = async (req, res, next) => {

    return manager.principalLogin(req)
        .then(data => {
            let result = {
                status: 200,
                adminId: data.adminId,
                token: data.authtoken
            }
            return res.json(result);

        }).catch(next);
}


let getPrincipalList = async (req, res, next) => {
    return manager.getPrincipalList(req)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                PrincipalList: data.PrincipalList
            }
            return res.json(result);

        }).catch(next);
}


let staffRegister = async (req, res, next) => {

    return manager.staffRegister(req)
        .then(data => {
            let result = {
                status: 200,
                token: data.b
            }
            return res.json(result);

        }).catch(next);
}


let staffLogin = async (req, res, next) => {
    return manager.staffLogin(req)
        .then(data => {
            let result = {
                status: 200,
                staffId: data.staffId,
                token: data.authtoken
            }
            return res.json(result);

        }).catch(next);
}


//  --- Update staff
let staffUpdate = async (req, res, next) => {
    return manager.staffUpdate(req.params.id, req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}



let getStaffList = async (req, res, next) => {
    return manager.getStaffList(req)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                staffId: data.staffId,
                StaffList: data.StaffList
            }
            return res.json(result);

        }).catch(next);
}


let getStaffById = async (req, res, next) => {
    return manager.getStaffById(req.params.id)
        .then(data => {
            let result = {
                status: 200,
                updateStaff: data.updateStaff
            }
            return res.json(result);

        }).catch(next);
}


let getStaffPage = async (req, res, next) => {
    return manager.getStaffPage(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}


let deleteStaff = async (req, res, next) => {
    return manager.deleteStaff(req.params.id, req, req.userid)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}


let deletePrincipal = async (req, res, next) => {
    return manager.deletePrincipal(req.params.id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}

module.exports = { adminRegister, adminLogin, getAdminList, principalRegister, principalLogin, getPrincipalList, staffRegister, staffLogin, staffUpdate, getStaffList, getStaffById, getStaffPage, deleteStaff, deletePrincipal }