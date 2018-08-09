const _ = require('lodash');
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./../server/config/config');
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const port = process.env.PORT;
var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(200).send(e);
        });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        return res.send({ todos });
    }), (e) => {
        return res.status(400).send(e);
    };
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({ msg: 'Invalid ID' });
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({ msg: 'Todo not found' });
        }
        return res.status(200).send({ todo });
    }).catch((e) => {
        console.log('​e', e);

        return res.status(404).send({
            msg: 'Todo not found'
        });
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({ msg: 'Invalid ID' });
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({ msg: 'Todo not found' });
        }
        return res.status(200).send({ todo });
    }).catch((e) => {
        console.log('​e', e);
        return res.status(404).send({
            msg: 'Todo not found'
        });
    });

});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({ msg: 'Invalid ID' });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.status(200).send({ todo });
    }).catch((e) => {
        console.log('​e', e);
        return res.status(404).send();
    });

});




app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};