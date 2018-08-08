const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     compleatedAt: {
//         type: Number,
//         default: null
//     }
// });


// var newTodo = new Todo({
//     text: ' Edit the video ',
//     // completed: false

// });

// newTodo.save().then((doc) => {
//     console.log('​Saved todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });



var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});



var newUser = new User({
    email: '      paragm@mkcl.org        '
});

newUser.save()
    .then((result) => {
        console.log('User saved', result);
    }, (e) => {
        conslose.log('Unable to save User', e);
    });