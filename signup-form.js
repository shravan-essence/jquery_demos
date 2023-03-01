	$(document).ready(function(){

	$(#myform).validate({
		rules: {
			fname:{
				required: true,
				minlength: 3
			},
			lname: "required",
			username: {
				required: true,
				minlength: 4
			},
			email: {
				required: true
				email: true
			},
			password1: {
				required: true,
				minlength: 6
			},
			password2: {
				required:true,
				minlength: 6,
				equalTo : "#password1"
			}
		},
		messages:{
			fname: {
				required:"Please enter your first name",
				minlength: "Length should be min 3"
			},
			lname: "Please enter your last name",
			username: {
				required: "Please enter username",
				minlength: "Length should be 4"
			},
			email: {
				required: "Please enter email",
				email: "Please enter valid email"
			},
			password1: {
				required: "Please enter password",
				minlength: "Length should be 6"
			},
			password2: {
				required: "Please enter confirm password",
				minlength: "Length should be 6",
				equalTo: "Please enter same password as above"
			}
		}
	});
});