var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseModel = new Schema({
    title: { type: String },
    description: { type: String },
    author: { type: String },
    tags: { type: [String] },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Course', courseModel);