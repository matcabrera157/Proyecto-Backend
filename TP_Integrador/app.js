const express = require("express");
const app = express();
const hbs = require("hbs");
const cors = require('cors');
const axios = require("axios");
require("dotenv").config();
const movieRoutes = require('./router/movieRoutes');
const port = 8085;

// Middleware CORS
app.use(cors());

// HANDLEBARS 
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");



// Middleware 
app.use("/assets", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public/imagen', express.static(__dirname + '/public/imagen'));

app.use(require("./router/router"));

app.use(require("./router/formulario"));


app.get("/", (req, res)=>{
    res.render("inicio",{
    })
});

app.get("/inicio", (req, res)=>{
    res.render("inicio",{
    })
});

app.get("/repositorio", (req, res)=>{
    res.render("repositorio",{
        title: "Formulario de repositorio del desarrollador"
    })
});

 // Endpoint para obtener informacion de un repositorio
 app.get("/repositories", async (req, res) => {
    try {
        const owner = req.query.owner;
        const repo = req.query.repo;
        const url = `https://api.github.com/repos/${owner}/${repo}`;

        
        const token = process.env.GITHUB_TOKEN;
        const headers = {
        Authorization: `Bearer ${token}`,
        };

        //Realizar la solicitud a la API de GitHub
        const response = await axios.get(url, { headers });

        //Renderizar la vista de detalla del repositorio
        res.render("repositorioinfo", {
        title: "Información del repositorio solicitado",
        repository: response.data,
        });
    } catch (error) {
        // Manejar cualquier error de la solicitud
        res.render("error", {
        title: "Error",
        message: "Error al obtener información del respositorio",
        });
    }
    });



    app.use ('/movies', movieRoutes );



app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
});
