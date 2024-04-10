//Imports
const logger = require("../model/logger")(__filename)

module.exports = (app) => {
    try {

        //User Validation
        const userValidation = require("../validation/user/userValidation")()

        //User Controllers
        const user = require("../controller/user/user")()

        //User APIs
        app.post('/user/add',userValidation.addUser, user.addData)
        app.get('/user/list',user.listData)
        app.post('/user/listbyid',user.listbyid)
        app.put('/user/update',user.updateData)
        app.delete('/user/delete', userValidation.checkId, user.deleteData) 
        
    } catch (e) {
        logger.error(`Error in user route: ${e.message}`)
    }
};