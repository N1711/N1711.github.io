var final_string = stringOut;															//you can see below I am still using the old format out of habit. 
var divPosition = 40;
var rect;
var btn23 = document.getElementById("button23"); 										//Build Mode button
var textedit_mode = false;
var btn25 = document.getElementById("button25");
var btn26 = document.getElementById("button26");
var btn27 = document.getElementById("button27");
var btn28 = document.getElementById("button28");
var divInfo = document.getElementById("siteinfo");
divInfo.value = "Line1: " + '\n' + "Line2: " + '\n' + "Line 3:" + '\n' + "Line4" + '\n' + "Line5:" + '\n' + "Line6:" + '\n' + "Line7:" + '\n' + "Line8:" + '\n' + "Comments: "; //default value in the form Site Info

function addSite(elem) { if (textedit_mode){ document.getElementById("myForm").style.display = "none"; }
let a = document.getElementsByTagName('a'); 											//find all a elements
for(let num of a) { num.classList.remove('active') } 
	elem.classList.add('active');
	reposition();
}

function reposition() { let pos3 = document.getElementById("myForm"); 					//hide the form
		rect = document.getElementsByClassName("active")[0].getBoundingClientRect(); 	//find its coordinates on the screen
		pos3.style.left = rect.left - 600 + "px"; 										//adjust the horizontal position
		pos3.style.top = rect.top - 50 + "px"; 											//adjust the vertical position
		if (!textedit_mode) {
		pos3.style.display = "block"; 													//if user has the text mode switched off, display the menu
	}
}

const insSol = () => {
	document.getElementById("myForm").style.display = "none"; 							//hide the menu
	let change = document.getElementsByClassName("active"); 							//find the active (clicked) element
	change[0].insertAdjacentHTML('afterend', '<ul><li><a href="#" onClick="addSite(this)">Path 1</a></li></ul>'); //insert this code after it
}

const insDec = () => {
	document.getElementById("myForm").style.display = "none"; 							//hide the form
	let decision = document.getElementsByClassName("active"); 							//find the active (clicked) element
	decision[0].insertAdjacentHTML('afterend', '<ul><li><p class="gr">Yes</p><a href="#" onClick="addSite(this)">Path 1</a></li><li><p class="rd">No</p><a href="#" onClick="addSite(this)">Path 2</a></li></ul>'); //insert this code after it
}

const delBlock = () => {
	document.getElementById("myForm").style.display = "none"; 							//hide the menu
	let tagged = document.getElementsByClassName("active"); 							//find the active element
	tagged[0].parentNode.parentNode.remove(); 											//delete its parent parent node, this includes <ul> and <li> tags
}

																						

btn23.onclick = function() {															//Build Mode - Switch off text edit mode
	document.body.contentEditable = "false";
	document.getElementsByClassName("active")[0].contentEditable = false; 				//remove the editable text mode of the active (clicked) element
	textedit_mode = false;
}

const contentE = () => {
	document.getElementById("myForm").style.display = "none"; 							//hide the menu
	textedit_mode = true; 																//switch on the text edit mode
	var q = document.getElementsByClassName("active"); 									//find the clicked (active) element
	q[0].contentEditable = true; 														//enable the contentEditable mode - valid for the <a> element itself
}

btn25.onclick = function() {
	document.body.contentEditable = "false";
	textedit_mode = false;
	document.getElementsByClassName("alarmBox")[0].style.display = "none"; 				//hide the form on the left
	document.getElementById("myForm").style.display = "none"; 							//hide the menu
	btn23.style.display = "none"; 														//hide the top buttons
	btn25.style.display = "none";
	btn26.style.display = "none";
	btn27.style.display = "none";
	let aTag = document.getElementsByTagName('a'); 										//find all a elements
	for (let a of aTag) { a.onclick = null; } btn28.style.display = "block"; 			//enable Download button
}

function downloadInnerHtml(filename, elId, mimeType) {									//Download the file
    let elHtml = final_string;
    let link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}

btn26.onclick = function() {															//Move the flowchart 5px to the right
	document.getElementById("mainframe").style.left = divPosition + 5 + "%";
	divPosition = divPosition + 5;
}

btn27.onclick = function() {															//move the flowchart to the left
	document.getElementById("mainframe").style.left = divPosition - 5 + "%";
	divPosition = divPosition - 5;
}

btn28.onclick = function() {															//Export the page. This comes after the Save Changes has been clicked
	textedit_mode = true;
	let fileName =  document.title + '.html';
	btn28.style.display = "none";
	//add the javascript at the end
	final_string = stringOut + '\n<body>' + document.getElementById("code_export").innerHTML + "<" + "script" + ">" + '\nvar address = window.location.href.split("#")[0];\n\ndocument.addEventListener ("keydown", function (zEvent) {\nif (zEvent.ctrlKey && zEvent.altKey && zEvent.code === "KeyE") {\n editbtn.style.display = "block";\n}\n}); \nvar modal = document.getElementById("myModal");\nvar btn = document.getElementById("info");\nvar span = document.getElementsByClassName("close")[0];\nvar editbtn = document.getElementById("edit");\neditbtn.onclick = function() {editbtn.style.display = "none";\naddress = address + "|view:webEditors:TextFileEditor";\nwindow.open(address)\n} \nbtn.onclick = function() {\nmodal.style.display = "block";\n}\nspan.onclick = function() {\nmodal.style.display = "none";\n}\nwindow.onclick = function(event) {\nif (event.target == modal) {\nmodal.style.display = "none";\n}\n}'+'\n' + "<" + "/script" + ">" + '</body></html>';
	downloadInnerHtml(fileName, 'main','text/html');
}

var modal = document.getElementById('myModal');											// Get the modal
var btn = document.getElementById("info");												// Get the button that opens the modal
var span = document.getElementsByClassName("close")[0];									// Get the <span> element that closes the modal

btn.onclick = function() {																// When the user clicks on the button, open the modal 
  modal.style.display = "block";
}

span.onclick = function() {																// When the user clicks on <span> (x), close the modal
  modal.style.display = "none";
}

window.onclick = function(event) {														// When the user clicks anywhere outside of the modal, close it
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function ListUpdate() {
	var info_panel = document.getElementById("sitepanel");
	var add_info = document.getElementById("addinfo");
	var infobox_1 = document.getElementById("infobox1").value;
	var text2 = document.getElementById("siteinfo").value;
	text2 = text2.replace(/\r?\n/g, '<br />');
	var titleBox = document.getElementById("title1").value;
	var titlePage = document.getElementById("title2");
	var alist = document.getElementById("list1");
	alist.innerHTML = '<b>' + "Additional Info" + '</b><br></br>' + document.getElementById("alarmList").innerHTML;
	titlePage.innerHTML = '<strong>' + titleBox + '</strong>';
	document.title = titleBox;
	info_panel.innerHTML = text2;
	add_info.innerHTML = infobox_1;
	if(document.getElementById("chk2").checked) {
		info_panel.style.display = "block";
	}
	else if (document.getElementById("chk3").checked) {
		info_panel.style.display = "none";
	}
	if (document.getElementById("chk0").checked) {
		add_info.style.display = "block";
	}
	else if (document.getElementById("chk1").checked) {
		add_info.style.display = "none";
	}
}