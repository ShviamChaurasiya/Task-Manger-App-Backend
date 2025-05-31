const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { authenticate, authorizeAdmin } = require('../middleware/auth.Middleware');
const { checkRole } = require('../middleware/role.middleware');
// Admin routes
router.post('/', authenticate, authorizeAdmin, taskController.createTask);
router.get('/', authenticate, authorizeAdmin, taskController.getAllTasks);
router.put('/:id', authenticate, authorizeAdmin, taskController.updateTask);
router.delete('/:id', authenticate, authorizeAdmin, taskController.deleteTask);

// Regular user routes
router.get('/my', authenticate, taskController.getMyTasks);
router.patch('/:id/complete', authenticate, taskController.markAsComplete);


module.exports = router;
