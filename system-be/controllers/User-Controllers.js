const User = require("../models/User-Model.js");
const Enroll = require("../models/Enrollment-model.js");
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: bcryptjs.hashSync(req.body.password, 10)
    })

    return newUser.save()
    .then(result => {
        res.send({
            code: "REGISTRATION-SUCCESS",
            message: "You are now registered!",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "REGISTRATION-FAILED",
            message: "We've encountered an error during the registration. Please try again!",
            result: error
        })
    })
}

// User Login
module.exports.loginUser = (req, res) =>{
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result => {
        if(result == null){
            return res.send({
                code: "USER-NOT-REGISTERED",
                message: "Please register to login."
            })
        }else{
            const isPasswordCorrect = bcryptjs.compareSync(password, result.password);

            if(isPasswordCorrect){
                return res.send({
                    code: "USER-LOGIN-SUCCESS",
                    token: auth.createAccessToken(result)
                })
            }else{
                return res.send({
                    code: "PASSWORD-INCORRECT",
                    message: "Password is not correct. Please try again."
                })
            }
        }
    })
}

// Check email if existing
module.exports.checkEmail = (req,res) => {
    let {email} = req.body;
    return User.find({email: email}).then(result => {
        if(result.length > 0){
            return res.send({
                code: "EMAIL-EXISTS",
                message: "The user is registered."
            })
        }else{
            return res.send({
                code: "EMAIL-NOT-EXISTING",
                message: "The user is not registered."
            }) 
        }
    })
}

module.exports.getProfile = (req, res) => {
    const {id} = req.user;
    return User.findById(id).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "USER-NOT-FOUND",
                message: "Cannot find user with the provided ID."
            })
        }else{
            result.password = "*****";
            return res.send({
                code: "USER-FOUND",
                message: "A user was found.",
                result: result
            })
        }
    })
}

// Enroll a user
module.exports.enroll = (req, res) => {
    const {id} = req.user;
    
    let newEnrollment = new Enroll({
        userId: id,
        enrolledCourse: req.body.enrolledCourse,
        totalPrice: req.body.totalPrice
    })

    return newEnrollment.save().then((result, err) => {
        if(err){
            res.send({
                code: "ENROLLMENT-FAILED",
                message: "There is a problem during your enrollment, please try again!",
                error: err
            })
        }else{
            res.send({
                code: "ENROLLMENT-SUCCESSFUL",
                message: "Congratulations, you are now enrolled!",
                result: result
            })
        }
    })
}


// module.exports.changeUserPassword = (req, res) => {
//     const { id } = req.params;
//     const { newPassword } = req.body;

//     try {
//         const hashedPassword =  bcryptjs.hashSync(newPassword, 10);
//         const updatePassword = {password: hashedPassword};

//         const result = User.findByIdAndUpdate(id, updatePassword, { new:true });

//         return res.json({
//             code: "PASSWORD-UPDATED-SUCCESSFULLY",
//             message: "Your password has been updated successfully",
//             result: result
//         })


//     } catch (error) {
//         return res.json({
//             code: "PASSWORD-UPDATE-FAILED",
//             message: "Cannot update password"
//         })
//     }
// } 

module.exports.changeUserPassword = (req, res) => {
    const { id } = req.user; 
    const { newPassword, confirmNewPassword } = req.body;
    console.log(newPassword, confirmNewPassword)

    // Check if newPassword and confirmNewPassword are provided
    if (!newPassword || !confirmNewPassword || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
        return res.status(400).json({
            code: "PASSWORD-UPDATE-FAILED",
            message: "Both new password and confirmation are required.",
        });
    }


    // Check if the passwords match
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
            code: "PASSWORD-MISMATCH",
            message: "The new password and confirmation do not match.",
        });
    }

    // Check if the passwords exceed the character limit
    if (newPassword.length > 50 || confirmNewPassword.length > 50) {
        return res.status(400).json({
            code: "PASSWORD-LIMIT",
            message: "The password exceeds the character limit",
        });
    }

    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    // Update the password in the database
    return User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    code: "USER-NOT-FOUND",
                    message: "User not found. Cannot update password.",
                });
            }

            return res.status(200).json({
                code: "PASSWORD-UPDATED-SUCCESSFULLY",
                message: "Your password has been updated successfully.",
                result: result,
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                code: "PASSWORD-UPDATE-FAILED",
                message: "An error occurred while updating your password. Please try again.",
                error: error.message,
            });
        });
};
