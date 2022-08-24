
const BadError = require('../error/baderror');
const UserAuth = require("../models/userAuth");
const StaffAuth = require("../models/staffAuth")

let validateUser = async (req, res, next) => {
    try {
        console.log(req.headers.token)
        let token = req.headers.token
        let user = await UserAuth
            .findOne({ where: { token: token }, raw: true });
        console.log(user);
        if (!user) {
            throw new BadError("User Invalid")
        }
        req.userid = user.adminId
        next()
    } catch (e) {
        console.log(e);
        next(e);
    }

}



// ---- Validate Staff ----
let validateStaff = async (req, res, next) => {
    try {
        console.log(req.headers.token)
        let token = req.headers.token
        let user = await StaffAuth
            .findOne({ where: { token: token }, raw: true });
        // console.log(user);
        if (!user) {
            throw new BadError("User Invalid")
        }
        req.userid = user.staffId,
            req.userstatus = user.staffstatus
        next()
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}
module.exports = { validateUser, validateStaff }
