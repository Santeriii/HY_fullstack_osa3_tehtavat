const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        numbeid: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        numbeid: "39-23-6423122",
        id: 4
    }
]

app.get('/', (req, res) => {
    const ytmaara = notes.length
    const date = new Date()
    console.log(ytmaara, date)
    res.send('<p>Phonebook has info for ' + ytmaara + ' people<br><br>' + date + '</p>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note.number)
    } else {
        response.status(404).end()
    }
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return Math.round(Math.random() * 100)
}

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    if (notes.map(n => n.name).includes(body.name)) {
        return res.status(400).json({
            error: 'name already in list'
        })
    }

    const note = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    console.log(note)

    notes = notes.concat(note)

    res.json(note)
})

app.get('api/notes', (req, res) =>{
    res.json(notes)
})

const port = 3003
app.listen(port, () => {
    console.log('Server running on port ${port}')
})

