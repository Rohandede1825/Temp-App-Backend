import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

mongoose.model('User', userSchema)

export default mongoose.model('User')