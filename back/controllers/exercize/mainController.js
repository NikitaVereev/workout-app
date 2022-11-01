// @descreate new exercise
// @route POST /api/exercises
// @access Private(Авторизованный пользователь)

import Exercise from '../../models/exerciseModel.js'
import asyncHandler from 'express-async-handler'

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, imageId } = req.body

	const exercises = await Exercise.create({
		name,
		times,
		imageId,
	})
	res.json(exercises)
})

//@desc update exercise
//@route api/exercises
//@access Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, imageId, exerciseId } = req.body

	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено')
	}

	exercise.name = name
	exercise.times = times
	exercise.imageId = imageId

	const updateExercise = await exercise.save()

	res.json(updateExercise)
})

//@desc delete exercise
//@route /api/exercises
//@access Private

export const deleteExercise = asyncHandler(async (req, res) => {
	const { exerciseId } = req.body

	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данного упражнения нет')
	}

	await exercise.remove()

	res.json({ message: 'Exercise has been removed' })
})

//@desc get exercises
//@route /api/exercises/
//@access Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await Exercise.find({})

	res.json(exercises)
})
