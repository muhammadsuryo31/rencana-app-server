const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    color: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

categorySchema.index({ userId: 1 });

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;