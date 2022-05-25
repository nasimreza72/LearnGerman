import mongoose from 'mongoose'

const { Schema, model } = mongoose


const GermanWordSchema = new Schema({
    german_word: { type: Array },
    query: { type: String }
})

const GermanWords = model("german_word", GermanWordSchema)

export default GermanWords