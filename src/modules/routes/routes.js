const express = require('express');
const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const {
  createAppoint,
  allAppoints,
  updateAppoint,
  deleteAppoint,
} = require('../controllers/list.controller');

router.post('/createAppoint', createAppoint);
router.get('/allAppoints', allAppoints);
router.patch('/updateAppoint', updateAppoint);
router.delete('/deleteAppoint', deleteAppoint);
router.post(
  '/registration',
  body('password').isLength({ min: 6, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
