import User from "../models/User";
import bcrypt from "bcryptjs";

let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const resetPassword = {
    async rest(req, res, next) {

        if(!regexPassword.test(req.body.password)){
            res.send({message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'});
            return;
        }   

        try{
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const resetPassword = await User.update(req.body, {
                where: {
                    id : req.params.id,
                    token: req.params.token
                }
            });
            res.status(201).send({message: 'Password updated successfully'});
        } catch(err){
            res.status(500).send({message: 'Error updating password'});
        }
    }
}

export default resetPassword;
