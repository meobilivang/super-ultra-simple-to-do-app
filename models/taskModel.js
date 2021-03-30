const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,            
        },
        board_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board' 
        },
    },
    //Collect created_at & updated_at timestamp 
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;