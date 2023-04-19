const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ModelSchema = new Schema({
    key: {
        type: number,
        required: true
    },
    value:{
        type: String,
        required
    }
})