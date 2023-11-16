let mongoose = require('mongoose');

let testClass = mongoose.Schema({
    Class: String,
    CRN: String,
    Date: Object,
    Time: Object,
},
{
    collection: "tests"
}

);
module.exports = mongoose.model('test', testClass);

