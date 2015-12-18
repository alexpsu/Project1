# Project1

Welcome to Feel Better, my very first web application, made to help a user better understand what actually helps them get healthy when they have a cold.

**User Stories:**
	On the homepage:
*	A user can fill out a form to create a new user profile.
*	Can click on an existing user to see there past colds.
	On a user’s page:
*	A user can see all their past colds.
*	They can create a new cold by giving it a name and start date in the form.
*	They can click on an existing cold, which takes them to a new page with more info about that cold.
*	A user can also update or delete an existing cold.
	On a cold’s page:
*	A user can see all the existing logs for that cold.
*	A user can fill out a form and create a new log.
*	A user can also update or delete an existing log.

To run Feel Better on your computer clone the repo and run “npm init” and then “npm install” in your terminal. After completion run nodemon in the project1 directory, and go to “localhost:3000” to see the web application up and running.

![Feel better]
(http://i.imgur.com/cFlXWVn.png)

Code Snippet:
```
	$('#logs-list').on('click', '.delete-log', function (event) {
		event.preventDefault();
		var url = window.location.href.split("/");
		var userId = url[4];
		var coldId = url[url.length-1];
		var logId = $(this).closest('.log').attr('data-id');
		console.log(logId);
		$.ajax({
			method: 'DELETE',
			url: baseUrl + userId + "/colds/" + coldId + "/logs/" + logId,
			success: function(element) {
				console.log(element);
			}
		});
		window.setTimeout(function(){location.reload()},500);
	});
```
This piece of code deletes a log that is embedded in a cold which is embedded in a user.

**Future considerations:**
*Add graphs to show data in a cleaner and more effective way.
*Create user login's and signups so the data is personal.

[Check out Feel Better on Github](https://github.com/alexpsu/Project1)
[Or Check it out on Heroku](https://peaceful-peak-1994.herokuapp.com/)