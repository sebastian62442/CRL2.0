const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Invalid credentials');
            }
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token, role: user.role, username: user.username });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },

    signup: async (req, res) => {
        const { username, email, password, role } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).send('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();
            const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(201).json({ message: 'User registered successfully', token , username});
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },

    logout: (req, res) => {
        // Logout implementation would typically handle token invalidation
        res.send('Logout successful');
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.json(user);
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    createUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });

            await newUser.save();
            res.status(201).send('User created');
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error');
        }
    },

    updateUser: async (req, res) => {
        try {
            const { username, email, role } = req.body;
            const user = await User.findByIdAndUpdate(req.params.id, {
                username,
                email,
                role
            }, { new: true });

            if (!user) {
                return res.status(404).send('User not found');
            }
            res.json(user);
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.send('User deleted');
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
};

module.exports = UserController;
