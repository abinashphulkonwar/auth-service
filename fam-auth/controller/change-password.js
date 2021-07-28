const User = require("../db/user");
const bcrypt = require("bcrypt");
const UserLog = require("../db/userLog");


exports.changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { email, id } = req.user;
        const userdb = await User.findOne({ email: email }).select({
            _id: 1,
            username: 1,
            email: 1,
            seal: 1,
            passwordhash: 1,
            userLogs: 1
        });
        if (!userdb) {
            res.status(404).json({ err: "account not found" })
        }
        let paaswordVal = await bcrypt.compare(oldPassword, userdb.passwordhash);
        if (paaswordVal) {
            const password = await bcrypt.hash(newPassword, 12);
            userdb.passwordhash = password;

            const userLogsdb = await new UserLog({
                route: "password change",
                ip: req.ip
            })

            userdb.userLogs.push(userLogsdb);
            await userLogsdb.save();

            await userdb.save();
            res.json({ success: "password change" })

        } else {
            res.status(405).json({ err: "wrong password" });
        }


    } catch (err) {
        console.log(err);
        res.json({ err: "somthing want wrong" })
    }

}