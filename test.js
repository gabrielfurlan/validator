var Validator = require('./index.js');

var values = {"text": "joao"};
var rules =  {"text": "required|maxlength:10"};
var msg = {"text.required": "Preenche pohaaaa", "text.minlength": "T[a errado"};

var validator = new Validator(values, rules, msg);
validator.init.then(function(response) {
	console.log(response);
});