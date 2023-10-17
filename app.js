const express    = require('express');
const app        = express();
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const router = require('./routes/jobs');

const PORT = 3000;


app.listen(PORT, function () {

    console.log(`O Express está rodando na porta ${PORT}`);

});


app.use(bodyParser.urlencoded({ extended: false }));


//db connection
db
    .authenticate()
    .then(() => { 
        console.log("Conectado ao banco de dados")
    })
    .catch(err => {
        console.log("Ocorreu um erro", err)
    });



// routes
app.get('/', (req, res) => {

    res.send("Hello World!");

});


// jobs routes
app.use('/jobs', require('./routes/jobs'));