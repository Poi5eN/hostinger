const {Router} = require('express')
const adminRoute = require('./adminRoute')
const accountUser = require('./accountUser')
const superAdmin = require('./superAdmin')
const contactUs = require('./contactUs')
const teacher = require('./teacher')
const { loginAll, logout } = require('../controllers/loginController')
const classTimeTable = require('./classTimeTable');
const exam = require('./exam');
const results = require('./results')
const feeStatus = require('./feeStatus')

const router = Router()

router.post('/login', loginAll);
router.get('/logout', logout);
router.use('/adminRoute',adminRoute);
router.use('/accountUser', accountUser)
router.use('/superAdmin',superAdmin);
router.use('/contactUs', contactUs)
router.use('/timeTable', classTimeTable);
router.use('/exam', exam);
router.use('/teacher', teacher)
router.use('/results', results)

router.use('/fees', feeStatus)

module.exports = router