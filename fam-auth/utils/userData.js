const User = require("../db/user");
const BusinessAccount = require("../db/Business")


class UserData {
    constructor(type) {
        this.type = type;
    }

    async getData(email) {
        try {
        let data;
        if (this.type == "User") {
            data = await User.findOne({ email: email }).select({
                _id: 1,
                username: 1,
                email: 1,
                posts: 1,
                image: 1,
                bio: 1,
                location: 1
            }).lean().populate("posts");
           } else if (this.type == "BusinessAccount") {
                data = await BusinessAccount.findOne({ email: email }).select({
                    _id: 1,
                    username: 1,
                    email: 1,
                    posts: 1,
                    image: 1,
                    bio: 1,
                    location: 1
                }).lean().populate("posts")
           }
        
           return data;
        } catch (err) {
            console.log(err);
            return null;
        } 
        }
    }


    module.exports.GetUserData = UserData;