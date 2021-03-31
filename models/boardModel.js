const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide a title for your Board"]
    },
    description: {
        type: String,
        trim: true,
    },
    //Referencing to an array of Tasks
    taskCollection: {
        type: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            index: true
        }],
    }, 
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
        index: true
    },
}, 
    //Collect created_at & updated_at timestamp 
    { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;