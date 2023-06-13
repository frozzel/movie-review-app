const mongoose = require('mongoose');// import mongoose
const genres = require("../utils/genres");


const tvSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: false
    },
    storyLine: {
        type: String,
        trim: true,
        required: false
    },

    releaseDate: {
        type: Date,
        required: false
    },
    TMDB_Id: {
        type: String,
        required: false,
        // enum: ['public', 'private']
    },
    IMDB: {
        type: String,
        required: false,
        
    },
    genres: {
        type: [String],
        required: false,
        enum: genres
    },
    tags: {
        type: [String],
        required: false,
        
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReviewTv" }],
    language: {
        type: String,
        required: false,
      },
    },
    { timestamps: true }
    );

module.exports = mongoose.model('TV', tvSchema);