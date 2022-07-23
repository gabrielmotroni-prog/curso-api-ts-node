"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const newsSchema_1 = require("../models/newsSchema");
//mapear a collection a ser criada no banco com a model
//Serve para mapear nossa model com a collection no db
exports.default = mongoose.model("news", newsSchema_1.default);
