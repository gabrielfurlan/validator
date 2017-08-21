var Validator = require('./index.js');

var values = {"text": "aehauehae@aes.co m"};
var rules =  {"text": "email"};
var msg = {"text.email": "Preenche pohaaaa"};

var validator = new Validator(values, rules, msg);
validator.init.then(function(response) {
	console.log(response);
});