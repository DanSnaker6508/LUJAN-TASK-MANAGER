const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            correo,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(400).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            mensaje: "Login exitoso",
            token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    register,
    login
};