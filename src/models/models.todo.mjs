import Mongoose from "mongoose";
import Joi from "joi";

const todoSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  completed: {
    type: Boolean,
  },
});
const TodoModel = Mongoose.model("Todo", todoSchema);
const JoiSchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  completed: Joi.boolean(),
});

export const validateTodo = (todo) => JoiSchema.validate(todo);
export default TodoModel;
