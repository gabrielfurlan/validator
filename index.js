var validates = require("./validates");

module.exports = function (values, rules, messages) {
	
	var _rules = rules;
	var _values = values;
	var _messages = messages;

	this.init = new Promise(function(resolve, reject) {

		var validate = new Promise(function(resolve, reject) {
			var rules = new Object();
			Object.keys(_rules).map(function(key) {
				rules[key] = _rules[key].split("|");
			});
			resolve(rules);
		});
	
		validate.then(function(values) {
			var isValid = true;
			var errors = new Object();
			Object.keys(values).map(function (key){
				var msgs = new Array(); 
				values[key].map(function(rule) {
					var name = rule;
					var param = null;
					if(rule.indexOf(":") != -1) {
						name = rule.substring(0, rule.indexOf(":"));
						param = rule.substring(rule.indexOf(":") + 1, rule.length);
					}

					if(!validates[name](_values, _values[key], param)) {
						msgs.push(_messages[key+"."+name]);
						isValid = false;
					}
				});

				errors[key] = msgs;
			});
			
			if(isValid) resolve({valideted: true, values: _values});
			else return resolve({valideted: false, errors: errors, values: _values});
		});
	});
}