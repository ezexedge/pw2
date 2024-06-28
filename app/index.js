import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import Evento from './Evento.js';

  const connect = async () => {
  try {
      await mongoose.connect("mongodb://mongodb:27017/eventos");
      console.log("Connnected");
  } catch (error) {
      console.error("Error");
  }
}

connect();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/views/')))

app.get("/", async (req, res) => {

    const eventos = await Evento.find()

    res.render("index", {
        eventos: eventos
    });
  });

app.post("/",  async (req, res) => {

    const evento  = req.body

    const nuevoEvento = new Evento({...evento})

    await nuevoEvento.save();

    res.redirect('/');
   
});


app.delete("/evento/:id", async (req, res) => {
  try {
      const id = req.params.id;
      await Evento.findByIdAndDelete(id);
      res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
      console.error("Error al eliminar el evento:", error);
      res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

app.put("/evento/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, fecha, precio } = req.body;

    await Evento.findByIdAndUpdate(id, { nombre, fecha, precio });

    res.json({ message: 'Evento actualizado correctamente' });
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
});
app.listen(3000);
