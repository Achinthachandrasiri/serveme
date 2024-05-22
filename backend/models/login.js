const mongoose = require('mongoose');
const router = require('express');
const bcrypt = require('bcryptjs'); // You need to install bcryptjs package
const workers = require('../models/workers'); // Assuming workers model is in a file called workersModel.js

async function login(email, password) {
    try {
        // Find the worker with the provided email
        const worker = await workers.findOne({ email });

        if (!worker) {
            throw new Error('Invalid email or password');
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, worker.password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // If email and password are valid, return the worker
        return worker;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = login;
