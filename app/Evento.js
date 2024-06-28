import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const EventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    precio: {
        type: Number,
    },
    fecha: {
        type: Date,
    },
});

const Evento = mongoose.model('Evento', EventoSchema);

export default Evento;
