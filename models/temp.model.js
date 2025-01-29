import mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  history: [{
    temperature: Number,
    recordedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tempLimit: {
    type: Number,
    default: 30
  }
});

 mongoose.model('Temperature', temperatureSchema);

export default  mongoose.model('Temperature');