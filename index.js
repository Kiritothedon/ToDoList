require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import { json as _json } from 'body-parser';
import cors from 'cors';
import { find, create, findByIdAndUpdate, findByIdAndDelete } from './Models/Todo';

const app = express()
app.use(cors())
app.use(json())
app.use(_json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});


app.get('/get', (req, res) => {
    find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    findByIdAndUpdate({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
    
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));