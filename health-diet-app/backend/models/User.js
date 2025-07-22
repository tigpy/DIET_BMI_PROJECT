import mongoose from 'mongoose';

const MealLogSchema = new mongoose.Schema({
  date: { type: String, required: true },
  meal: { type: String, required: true },
  calories: { type: Number }
}, { _id: false });

const WeightLogSchema = new mongoose.Schema({
  date: { type: String, required: true },
  weight: { type: Number, required: true }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  bmi: { type: Number },
  mealLogs: [MealLogSchema],
  weightLogs: [WeightLogSchema]
});

export default mongoose.model('User', UserSchema);
