const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserLog = require("../db/userLog");


exports.forgetPassword = async (req, res, next) => {
    try {
        const { email, passwordKey, newPassword } = req.body;
        const userdb = await User.findOne({ email: email }).select({
            _id: 1,
            email: 1,
            passwordhash: 1,
            passwordKey: 1,
            userLogs: 1
        })

        if (!userdb) {
            res.status(404).json({ err: "account not found" })
        }

        if (!passwordKey == userdb.passwordKey) {
            res.status(404).json({ err: "unvalid password key" })
            return;
        }

        const password = await bcrypt.hash(newPassword, 12);
        const jwtToken = await jwt.sign(
            {
                email: userdb.email,
                id: userdb._id,
            },
            process.env.JWT_KEY
        );

        userdb.passwordhash = password;
        userdb.passwordKey = '';

        const userLogsdb = await new UserLog({
            route: "forget password",
            ip: req.ip
        })

        userdb.userLogs.push(userLogsdb);
        await userLogsdb.save();

        await userdb.save();

        res.json({ token: jwtToken })

    } catch (err) {
        console.log(err);
        res.status(404).json({ err: "somthing wrong " });
    }
};
