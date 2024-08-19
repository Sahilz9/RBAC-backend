const { Router } = require("express");
const { register, login, logout, checkUser } = require("../controller/Auth");
const { isUser } = require("../middleware/verifyToken");

const AuthRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: All the API routes related to user authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *     Logout:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Logout confirmation message
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

/**
 * @swagger
 * /api/auth/checkuser:
 *   get:
 *     summary: Check the authenticated user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin routes for managing users and events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique ID
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The event's unique ID
 *         name:
 *           type: string
 *           description: The name of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the event
 */

/**
 * @swagger
 * /api/admin/getuser:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/admin/deleteuser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/admin/getevents:
 *   get:
 *     summary: Retrieve all user events
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/admin/deleteevents/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API routes for managing events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - date
 *         - capacity
 *         - price
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the event
 *         name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the event
 *         capacity:
 *           type: integer
 *           description: Maximum number of attendees
 *         price:
 *           type: number
 *           description: Price of the event
 *         rating:
 *           type: number
 *           description: Rating of the event
 *         userId:
 *           type: string
 *           description: ID of the user who created the event
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.post("/logout", logout);
AuthRoutes.get("/checkuser", isUser, checkUser);

module.exports = AuthRoutes;
