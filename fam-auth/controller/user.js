const { GetUserData } = require("../utils/userData");
exports.getUser = async (req, res, next) => {
    
    try {
     const { type } = req.query;
     const user = await new GetUserData(type);
     const userData = await user.getData(req.user.email);
    
     if (userData) {
         res.json(userData);
     } else {
         res.status(404).json({err : "account not found"})
     }
    } catch (err) {
        console.log(err);
        res.status(404).json({err: "somthing wrong"})
    }
}