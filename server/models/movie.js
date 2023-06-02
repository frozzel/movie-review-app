const mongoose = require('mongoose');// import mongoose
const genres = require("../utils/genres");

const movieSchema = mongoose.Schema({
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
    // director: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Actor',
    // },
    releaseDate: {
        type: Date,
        required: false
    },
    TMDB_Id: {
        type: String,
        required: false,
        // enum: ['public', 'private']
    },
    type: {
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
    // cast: [
    //     {
    //         actor: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor'},
    //         roleAs: String,
    //         leadActor: Boolean,
    //     }
    // ],
    // writers: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Actor",
    //     },
    //   ],
    // poster: {
    //     type: Object,
    //     url: { type: String, required: false },
    //     public_id: { type: String, required: false },
    //     required: false,
    //   },
    // trailer: {
    //     type: Object,
    //     url: { type: String, required: false },
    //     public_id: { type: String, required: false },
    //     required: false,
    //   },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    language: {
        type: String,
        required: false,
      },
    },
    { timestamps: true }
    );

module.exports = mongoose.model('Movie', movieSchema);