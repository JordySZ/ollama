const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express(); // <--- AQUÍ SE DEFINE app

app.use(express.json()); // Habilitar JSON en las solicitudes
app.use(cors()); // Permitir solicitudes desde el frontend

app.post("/api/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "El prompt es obligatorio" });
        }

        // Usa el modelo finetuneado en Ollama
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "nuevo1",  // <---- Cambiado de "llama3.2" a tu modelo
            prompt: prompt, 
            stream: false
        });

        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Error en la petición a Ollama:", error.message);
        res.status(500).json({ error: "Error en el servidor", detalle: error.message });
    }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

