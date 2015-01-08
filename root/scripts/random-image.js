// create an array of images to use
var arr = [
	'crowd',
	'james',
	's-c',
	'stephanie',
	'steves',
	'vitaly'
];

// choose a random image
var idx = Math.floor(Math.random() * arr.length);

// set a class for that image (controlled in _layout-home.scss)
document.getElementById("home-decoration").className += " " + arr[idx];