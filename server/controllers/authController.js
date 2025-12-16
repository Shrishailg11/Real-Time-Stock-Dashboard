import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
