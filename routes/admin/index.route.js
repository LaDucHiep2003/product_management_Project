
const systemConfig = require('../../config/system')
const dashboardRouters = require('./dashboard.route')
const productdRouters = require('./product.route')
const productCategory = require("./product-category.route")
const roleCategory = require("./role.route")
const accountRouters = require("./account.route")
const authRouters = require("./auth.route")
const myAccountRouters = require("./my-account.route")


const authMiddleware = require("../../middlewares/admin/auth.middleware")


module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard',authMiddleware.requireAuth, dashboardRouters)
    app.use(PATH_ADMIN + '/products',authMiddleware.requireAuth, productdRouters)
    app.use(PATH_ADMIN + '/products-category',authMiddleware.requireAuth, productCategory)
    app.use(PATH_ADMIN + '/roles',authMiddleware.requireAuth, roleCategory)
    app.use(PATH_ADMIN + '/accounts',authMiddleware.requireAuth, accountRouters)
    app.use(PATH_ADMIN + '/auth', authRouters)
    app.use(PATH_ADMIN + '/my-account',authMiddleware.requireAuth, myAccountRouters)
}