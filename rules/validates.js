module.exports = {
	required: function(objeto, value) {
		if(String(value).trim() === "" || value == null) return false;
		return true;
	},

	maxlength: function(objeto, value, size) {
		if(value.length > size) return false;
		return true;
	},

	minlength: function(objeto, value, size) {
		if(value.length < size) return false;
		return true;
	},

	max: function(objeto, value, size) {
		if(value > size) return false;
		return true;
	},

	min: function(objeto, value, size) {
		if(value < size) return false;
		return true;
	},

	email: function(objeto, value) {
		var user = value.substring(0, value.indexOf("@")).trim();
		var dominio = value.substring(value.indexOf("@") + 1, value.length).trim();
		var host = dominio.substring(0, dominio.indexOf("."));
		if(user.length < 1 || 
			user.indexOf("@") != -1 || 
			host.length < 1 ||
			dominio.length < 3 || 
			dominio.indexOf("@") != -1 ||
			dominio.lastIndexOf(".") >= dominio.length - 1
		) return false;

		return true;
	},

	url: function(objeto, value) {
		if(String(value).trim() != "" && value != null){
			expression = new RegExp("^(https?:\/\/)(www.)(\\w{1,})(\\.)(\\w{2,})$");
			return expression.test(value);
		} else {
			return true;
		}
	},

	regexp: function(objeto, value, expression) {
		if(String(value).trim() !== "" && value != null){
			expression = new RegExp(expression);
			return expression.test(value);
		} else {
			return true;
		}
	},

	equals: function(object, value, index) {
		if(value != object[index]) return false;
		return true;
	}
}