const { ObjectID } = require('mongodb');

const { mongoos } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '5b6b1bb9d9d15327c002c80f';

if (!ObjectID.isValid(id)) {
    console.log('​ID not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('​todos', todos);
});


Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('​todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        console.log('​ID not found');
    }
    console.log('​todo by ID', todo);
}).catch((e) => console.log(e));