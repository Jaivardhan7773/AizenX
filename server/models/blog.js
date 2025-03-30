const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true, minlength: 300 },
    tags: { type: [String], required: true },
    author: {type: String , required: true},
    category: { 
        type: String, 
        required: true, 
        enum: ["Technology", "Health", "Education", "Entertainment", "Sports"] 
    },
    createdAt: { type: Date, default: Date.now },
 
});

module.exports = mongoose.model("Blog", BlogSchema);
