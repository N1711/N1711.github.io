var stringOut = `
<html>
<head>

<style>
body {
	background-color: #00151f;
}

textarea {
	background-color: #000;
	color: rgba(76, 178, 224, 1);
	resize: none;
	border: 1px solid #262626;
}

.output {
	position: absolute;
	top: 2%;
	right: 2%;
}

label {
	color: #fff;
}

.modalbox {
	position: absolute;
	top: 2%;
	left: 1%;
}

.info2 {
	position: absolute;
	bottom: 2%;
	left: 1%;
}

.collapsible {
  background-color: #7a7b7c;
  color: #d4d4d6;
  cursor: pointer;
  padding: 18px;
  width: 300px;
  border: none;
  text-align: center;
  outline: none;
  font-size: 15px;
  display: inline;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .collapsible:hover {
  background-color: #333942;
}

/* Style the collapsible content. Note: hidden by default */
.content {
  padding: 0 0px;
  display: none;
  width: 300px;
  overflow: hidden;
  background-color: #d4d4d4;
}

.editable {
	background-color: #a30975;
	color: #fff;
	border: 1px solid rgb(74,176,255);
	box-shadow: 2px 4px 2px #000;
	font-family: Segoe;
	font-size: 12pt;
	width: 50px;
	height: 30px;
	border-radius: 5px;
	cursor: pointer;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  position: relative;
  margin: 0;
  padding: 0;
  
  border: 0 none;
    
  -webkit-transition: all ease .4s;
  -moz-transition: all ease .4s;
    transition: all ease .4s;
}


h1 {
  padding-top: 40px;
    
  color: #ccc;
  text-align: center;
  font-size: 1.8rem;
     
    text-shadow: rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 0 1px, rgba(0,0,0,0.6) 0 1px;
}

.nav {
  margin: 1px auto;
  min-width: auto;
  min-height: auto;
  overflow-x: hidden;
}

.nav ul {
  position: relative;
  padding-top: 20px; 
}

.nav li {
  position: relative;
  padding: 20px 3px 0 3px; 
  float: left; 
  
  text-align: center;
  list-style-type: none; 
}

.nav li::before, .nav li::after{
  content: '';
  position: absolute; 
  top: 0; 
  right: 50%;
  width: 50%; 
  height: 20px;
  border-top: 1px solid #ccc;
}

.nav li::after{
  left: 50%;
  right: auto; 
  
  border-left: 1px solid #ccc;
}

.nav li:only-child::after, .nav li:only-child::before {
  content: '';
  display: none;
}

.nav li:only-child{ padding-top: 0;}
.nav li:first-child::before, .nav li:last-child::after{
  border: 0 none;
}

.nav li:last-child::before{
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
}

.nav li:first-child::after{
    border-radius: 5px 0 0 0;
}
.nav ul ul::before{
  content: '';
  position: absolute; top: 0; left: 50%;
  border-left: 1px solid #ccc;
  width: 0; 
  height: 20px;
}

.nav li a{
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #ccc;
  font-family: arial, verdana, tahoma;
  font-size: 12px;
  /*height: 30px;*/
}

.nav li a:after {
	content: '';
}

.nav li p{
  position: relative;
  margin-bottom: 5px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-family: arial, verdana, tahoma;
  font-size: 12px;
}

.gr {
	color: #a7ef92;
}

.rd {
	color: red;
}

.nav li a:hover, .nav li a:hover+ul li a {
  color: #000;
  background: #c8e4f8;   
  border: 1px solid #94a0b4;
}

.nav li a:hover+ul li::after, 
.nav li a:hover+ul li::before, 
.nav li a:hover+ul::before, 
.nav li a:hover+ul ul::before{
  content: '';
  border-color: #94a0b4;
}

.info {
	position: relative;
	border: 1px solid #ccc;
	width: 200px;
	height: auto;
	color: #ccc;
	text-align: center;
	font-size: 12px;
	display: none;
}

.info_add {
	position: relative;
	border: 1px solid #ccc;
	width: 200px;
	height: auto;
	color: #ccc;
	text-align: center;
	font-size: 12px;
	display: none;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
span .close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.close1 {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close1:hover,
.close1:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

table, th, td {
	border: 1px solid black;
}

.ret {
	font-family: Georgia;
	font-size: 36px;
	color: #c6c6c6;
	text-shadow: 0 0 3px #000000, 0 0 3px #000000;
}

.ter {
	font-family: Georgia;
	font-size: 16px;
	color: red;
	text-shadow: 0 0 3px #000000, 0 0 5px #000000;
}

body {
	background-color: #00151f;
}

#container {
	position: absolute;
	left: 50%;
	right: 50%;
	top: 10%;
	background: #45453f;
}

.pulse {
	width: 10px;
	height: 10px;
	border: 5px solid #ce7c10;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	border-radius: 30px;
	background-color: #ce7c10;
	z-index: 10;
	position: absolute;
}

.dot {
	border: 10px solid #fff601;
	background: transparent;
	-webkit-border-radius: 60px;
	-moz-border-radius: 60px;
	border-radius: 60px;
	height: 50px;
	width: 50px;
	-webkit-animation: pulse 1.5s ease-out;
	-moz-animation: pulse 1.5s ease-out;
	animation: pulse 1.5s ease-out;
	-webkit-animation-iteration-count: infinite;
	-moz-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	position: absolute;
	top: -20px;
	left: -20px;
	z-index: 1;
	opacity: 0;
}

@-moz-keyframes pulse {
 0% {
    -moz-transform: scale(0);
    opacity: 0.0;
 }
 25% {
    -moz-transform: scale(0);
    opacity: 0.1;
 }
 50% {
    -moz-transform: scale(0.1);
    opacity: 0.3;
 }
 75% {
    -moz-transform: scale(0.5);
    opacity: 0.5;
 }
 100% {
    -moz-transform: scale(1);
    opacity: 0.0;
 }
}

@-webkit-keyframes "pulse" {
 0% {
    -webkit-transform: scale(0);
    opacity: 0.0;
 }
 25% {
    -webkit-transform: scale(0);
    opacity: 0.1;
 }
 50% {
    -webkit-transform: scale(0.1);
    opacity: 0.3;
 }
 75% {
    -webkit-transform: scale(0.5);
    opacity: 0.5;
 }
 100% {
    -webkit-transform: scale(1);
    opacity: 0.0;
 }
}
@keyframes pulse {
 0% {
    transform: scale(0);
    opacity: 0.0;
 }
 25% {
    transform: scale(0);
    opacity: 0.1;
 }
 50% {
    transform: scale(0.1);
    opacity: 0.3;
 }
 75% {
    transform: scale(0.5);
    opacity: 0.5;
 }
 100% {
    transform: scale(1);
    opacity: 0.0;
 }
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: relative;
  z-index: 9;
  width: 155px;
}

/* Add styles to the form container */
.form-container {
  width: 150px;
  padding: 10px;
}

.form-container a {
	text-decoration: none;
	color: #fff;
	border: 1px solid #676767;
	border-radius: 5px;
	padding: 5px;
	background: rgba(64, 176, 224, 0.7);
	box-shadow: 2px 2px 2px rgba(64, 176, 224, 1);
}

.alarmBox {
	position: absolute;
	left: 1%;
	top: 5%;
}

.buttons-box {
	position: absolute;
	right: 1%;
	top: 5%;
}

.btn23 {
	width: 100px;
	height: 20px;
	border: 1px solid #676767;
	background-color: #00151f;
	color: #676767;
	cursor: pointer;
}

.btn22 {
	background-color: #676767;
	width: 300px;
	height: auto;
	color: rgb( 64, 176, 224);
}

</style>
</head> ` ;