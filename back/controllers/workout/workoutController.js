import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

// @desc create new workout
// @route POST /api/workout
// @access Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
	})
	res.json(workout)
})

// @desc Get Workout
// @route Get /api/workout/:id
// @access Private

export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean()
	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})

//@desc get workouts
//@route /api/workouts
//@access Private

export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await Workout.find({}).populate('exercises')

	res.json(workouts)
})

//@desc Update workout
//@routs /api/workouts
//@ access Private

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds, workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренеровка не найдена')
	}

	workout.name = name
	workout.exercises = exerciseIds

	const updateWorkout = await workout.save()

	res.json(updateWorkout)
})

//@desc delete workout
//@route /api/workout
//@access Private

export const deleteWorkout = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данной тренировки нет')
	}

	await workout.remove()

	res.json({ message: 'Workout has been removed' })
})
