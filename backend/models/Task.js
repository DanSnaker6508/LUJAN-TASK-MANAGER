const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        default: "Pendiente"
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", taskSchema);