const {Router} = require('express')
const { createStudyMaterial, getStudyMaterial, deleteStudyMaterial ,createAttendance,getAttendanceByMonth,updateAttendance} = require('../controllers/teacherController')
const { singleUpload } = require('../middleware/multer')
const verifyToken = require('../middleware/auth')
const router = Router()

router.post('/createStudyMaterial', verifyToken, singleUpload, createStudyMaterial)
router.get('/getStudyMaterial',verifyToken, getStudyMaterial)
router.delete('/deleteStudyMaterial/:studyId', verifyToken , deleteStudyMaterial)


router.post('/createAttendance', verifyToken, createAttendance);
router.get('/getAttendance',verifyToken, getAttendanceByMonth);

module.exports = router