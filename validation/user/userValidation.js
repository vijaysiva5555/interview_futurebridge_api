//Imports
const { check, validationResult } = require('express-validator')

//User Validation
module.exports = function (app, io) {
    let data = { status: 0, response: 'Invalid Request' }, validator = {}

    validator.checkId = [
        check('data').notEmpty().withMessage('Data cannot be empty'),
        check('data.*.id').trim().notEmpty().withMessage('Id is required field').isMongoId().withMessage('Invalid Id'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.addUser =
        [
            check('data').notEmpty().withMessage('Data cannot be empty'),
            check('data.*.firstname').trim().notEmpty().withMessage('firstname cannot be empty').matches(/^[A-Za-z\s]+$/).withMessage('firstname should be only letters'),
            check('data.*.lastname').trim().notEmpty().withMessage('lastname cannot be empty').matches(/^[A-Za-z\s]+$/).withMessage('lastname should be only letters'),
            check('data.*.email').trim().notEmpty().withMessage('email cannot be empty').isEmail().withMessage('Enter Valid emailID'),
            check('data.*.country').trim().notEmpty().withMessage('country cannot be empty'),
            check('data.*.about').trim().notEmpty().withMessage('about cannot be empty'),
            check('data.*.phone').trim().notEmpty().isNumeric().withMessage('Mobile Number cannot be empty & should be Numeric'),
            (req, res, next) => {
                const errors = validationResult(req).array()
                if (errors.length > 0) {

                    return res.send({ status: 0, response: errors[0].msg })
                }

                return next()
            }
        ]

   
    return validator;
}
