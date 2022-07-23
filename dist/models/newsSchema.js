"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
    hat: { type: String },
    title: { type: String },
    text: { type: String },
    author: { type: String },
    publishDate: { type: Date },
    link: { type: String },
    active: { type: Boolean },
});
exports.default = newsSchema;
