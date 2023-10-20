const { param ,
    check,
    query,
    validationResult,} = require ("express-validator")

const validateCreate = [
    check("email")
        .exists()
        .isEmail()
        .withMessage("The name field must be an email"),
    check("username")
        .exists()
        .isString(),
    check("address")   
        .exists()
        .isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw()
            return next()
        } catch (err) {
            res.status(403)
            res.send({ errors: err.array() })
        }
    }
]

const validateDelete = [
    param("id").exists().isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw()
            return next()
        }catch(error){
            res.status(403)
            res.send({errors : err.array()})
        }
    }
]

const validateGetWithQueryStrings = [
	query("size").exists().isString(),
	query("page").exists().isString(),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
]


module.exports = {
    validateCreate,
    validateDelete,
    validateGetWithQueryStrings,
}
