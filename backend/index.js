const connectTOMongo = require('./db');
const express = require('express')
const authRoutes = require('./routes/auth');
var cors = require('cors')

connectTOMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
//Available Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})