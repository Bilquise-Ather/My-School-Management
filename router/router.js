const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const middleware = require('../middleware/validateUser');
let file_upload = require('../helper/file_uploads');

router.post('/admin', file_upload.uploadUserProfileImage.single('image'), controller.adminRegister);

// router.post('/manager_register', fileUploadHelper.uploadUserProfileImage.fields([{ name: 'profileimage' }]), controller.managerRegister);

router.post('/login/admin', controller.adminLogin);

router.post('/principal', middleware.validateUser, controller.principalRegister);

router.post('/login/principal', controller.principalLogin);

router.post('/staff', middleware.validateUser, file_upload.uploadUserProfileImage.single('image'), controller.staffRegister);

router.post('/login/staff', controller.staffLogin);

router.get('/admin_list', middleware.validateUser, controller.getAdminList);

router.get('/principal_list', middleware.validateUser, controller.getPrincipalList);

router.post('/staff', middleware.validateUser, file_upload.uploadUserProfileImage.single('image'), controller.staffRegister);
router.put('/update/staff/:id', controller.staffUpdate);

router.get('/staff_list', controller.getStaffList);

router.get('/getStaffById/:id', controller.getStaffById);

router.get('/staff_page', middleware.validateUser, controller.getStaffPage);

router.delete('/delete/principal/:id', controller.deletePrincipal);

router.delete('/delete/staff/:id', controller.deleteStaff);

module.exports = router; 