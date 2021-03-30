const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 50,
    },
    description: {
        type: String,
        trim: true,
    },
    //Referencing to an array of Tasks
    task_collection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task' 
    }], 
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, 
    //Collect created_at & updated_at timestamp 
    { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;