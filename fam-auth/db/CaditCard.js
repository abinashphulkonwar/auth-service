const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CraditCardSchema = new Schema({

    number: {
        type: Number,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "BusinessAccount"
    },
   expire: {
        type: String,
        required: true,
        required: true,
    },
    payments : [
        {
            type: Schema.Types.ObjectId,
            ref: "Payment"
        }
    ]
}, {
    timestamps: true,
})


module.exports = mongoose.model("CraditCard", CraditCardSchema);