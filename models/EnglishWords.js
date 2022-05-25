import mongoose from 'mongoose'

const { Schema, model } = mongoose


const newWords = new Schema({
    word: { type: Array}
})

const Word = model("word", newWords)

export default Word