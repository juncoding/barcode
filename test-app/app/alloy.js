// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var App = Alloy.Globals;

App.Styles = require('styles');

App.showAlert = function(message, title, ok) {
	var alert = Ti.UI.createAlertDialog({
		persistent : true,
		title : title || ' ',
		message : message || ' ',
		ok : ok || 'OK',
	});
	alert.show();
};
App.showDialog = function(param) {
	var dialog = Ti.UI.createAlertDialog({
		persistent : true, //This property is useful to ensure that the alert dialog will not be ignored by the user when the application is paused/suspended.
		title : param.title || ' ',
		message : param.message || ' ',
		buttonNames : param.buttonNames || []
	});
	dialog.addEventListener('click', function(evt) {
		param.callbacks = param.callbacks || {};
		if (evt.index >= 0 && 'function' === typeof param.callbacks[evt.index + ''])
			param.callbacks[evt.index+''](evt);
	});
	dialog.show();
	return dialog;
};