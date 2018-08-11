const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = "1253abc";


bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('​hash', hash);
    });
});

var hashedPassword = "$2a$10$rM2JFrnQE7cZlfIRzKo/quSqoJzJOEgtp5CIysbSQaMEOsWCFDQyG";

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log('​res', res);

});


// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc');
// console.log('​token', token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);