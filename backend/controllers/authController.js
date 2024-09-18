const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const user = await User.create({
            username,
            password: hashedPassword,
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user please try again' });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, 'secret', {
            expiresIn: 86400,
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in please try again' });
    }
};