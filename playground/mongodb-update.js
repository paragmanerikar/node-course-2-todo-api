// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b69c33a35497a1bd419a844')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });


    db.collection('Users')
        .findOneAndUpdate({ _id: ObjectID('5b6aa87ccf260d01fcd7af3d') }, {
            $set: { name: 'Jitendra' },
            $inc: { age: 1 }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        });

    // client.close();
});