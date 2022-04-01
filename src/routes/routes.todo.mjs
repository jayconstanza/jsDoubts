import express from "express";
// import Mongoose from 'mongoose'
import Todo, { validateTodo } from "../models/models.todo.mjs";
import Mongoose from "mongoose";


const router = express.Router();
//_ before req says that is passed, but not used
router.get("/", async (_req, res) => {
    // sending all data to response
    const todos = await Todo.find()

    return res.json({
      success: true,
      data: todos,
      message: 'Request successful!',
    })
});
// Get the data about a single todo
router.get('/:id', async (req, res) => {
  if (!Mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      success: false,
      data: [],
      message: 'It is not a valid mongodb id',
    })

  // search using id In mongodb with mongoose
  const todo = await Todo.findById(req.params.id)

  // checking if todo not found then 404 request
  if (!todo)
    return res.status(404).json(
      {
        success: false,
        data: [],
        message: 'There is no data found related to this id!',
      }
    )

  // if found then send the response
  return res.json({
    success: true,
    data: todo,
    message: 'Finding successful!',
  })
})

// update an existing todo
router.put('/:id', async (req, res) => {
  // Validating the user input
  const { error } = validateTodo(req.body)
  console.log('validateTodo', validateTodo(req.body))
  if (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error?.details[0]?.message,
    })
  }

  // find Id and updated it by mongoose
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req?.body?.title, completed: req?.body?.completed },
    {
      new: true,
    }
  )

  // if todo is not available then error or else new updated data send to user
  if (!todo)
    return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
    })

  return res.json({
    success: true,
    data: todo,
    message: 'Update successful!',
  })
})

router.post("/", async (req, res) => {
  // validate using Joi, with factoring function
  const { error } = validateTodo(req.body);

  // if have any error then return bad request with error else just add the new one
  if (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error?.details[0]?.message,
    });
  }

  let todo = new Todo({
    title: req?.body?.title,
    completed: req?.body?.completed
  });

  todo = await todo.save();
  return res.json({
    success: true,
    data: todo,
    message: "New todo adding successful!",
  });
});


export default router
