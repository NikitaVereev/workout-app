import express from 'express'
import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise,
} from '../controllers/exercize/mainController.js'
import { createNewExerciseLog } from '../controllers/exercize/log/createController.js'
import { protect } from '../middleware/authMiddleware.js'
import { getExerciseLog } from '../controllers/exercize/log/getController.js'
import {
	updateCompleteExerciseLog,
	updateExerciseLog,
} from '../controllers/exercize/log/updateController.js'

const router = express.Router()

router
	.route('/')
	.get(protect, getExercises)
	.post(protect, createNewExercise)
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

router
	.route('/log')
	.post(protect, createNewExerciseLog)
	.put(protect, updateExerciseLog)

router.route('/log/completed').put(protect, updateCompleteExerciseLog)

router.route('/log/:id').get(protect, getExerciseLog)

export default router
