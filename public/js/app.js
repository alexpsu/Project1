$(document).ready(function(){
	console.log("app js is working");

	var source;
	var template;
	var baseUrl = '/api/users';
	var allUsers = [];
	var $userList;
	var $createUser = $('#create-user');

	var userHtml;
	var userToOpen;
	var userId;

	$.get(baseUrl, function(element){
		source = $('#users-template').html();
		template = Handlebars.compile(source);
		$userList = $('#users-list');
		allUsers = element.users;
		userHtml = template({users: allUsers});
		$userList.append(userHtml);
	});

	$('#users-list').on('click', '.user', function (event) {
		userId = $(this).closest('.user').attr('data-id');
		userToOpen = allUsers.filter(function (user) {
			return user._id == userId;
		})
		console.log(userToOpen);
		source = $('#user-template').html();
		template = Handlebars.compile(source);
		$userList = $('#user-list');
		$.get(baseUrl + "/userId", function(element){
			console.log("Something");
			userHtml = template({users: userToOpen});
			$userList.append(userHtml);
		})
	});
});