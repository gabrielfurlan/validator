var validates = require("./rules/validates");

module.exports = function (values, rules, messages) {
	
	var _rules = rules;
	var _values = values;
	var _messages = messages;
	var _messagesDefault = {
		required 	: "Required field",
		maxlength	: "Maximum character size of the field.",
		minlength	: "Minimum character size of the field.",
		max 		: "The maximum value of the field exceeded.",
		min 		: "The minimum field value exceeded.",
		email 		: "Invalid email.",
		url	 		: "Invalid link.",
		regexp 		: "Invalid field.",
		equals 		: "This field must be identical to the corresponding field."
	}

	this.init = new Promise(function(resolve, reject) {

		var splitRules = new Promise(function(resolve, reject) {
			var rules = new Object();
			Object.keys(_rules).map(function(key) {
				rules[key] = _rules[key].split("|");
			});
			resolve(rules);
		});
	
		splitRules.then(function(rules) {
			var isValid = true;
			var errors = new Object();
			Object.keys(rules).map(function(key) {
				var msgs = new Array(); 
				rules[key].map(function(rule) {
					var name = rule;
					var param = null;
					if(rule.indexOf(":") != -1) {
						name = rule.substring(0, rule.indexOf(":"));
						param = rule.substring(rule.indexOf(":") + 1, rule.length);
					}

					if(!validates[name](_values, _values[key], param)) {
						if(_messages[key+"."+name] != null) msgs.push(_messages[key+"."+name]);
						else msgs.push(_messagesDefault[name]);
						isValid = false;
					}
				});

				errors[key] = msgs;
			});
			
			if(isValid) resolve({validated: true, values: _values});
			else return resolve({validated: false, errors: errors, values: _values});
		});
	});
}