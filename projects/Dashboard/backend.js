const dateObj = {
  days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  monthLabel: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  soon: 0,
  expiring: 0
}

let siteCounter = document.getElementById("contractTable");
let n = new Date();
let yEar = n.getFullYear();
let mOnth = n.getMonth() + 1;
let dAy = n.getDate();
let dOfWeek = dateObj.days[ n.getDay() ];
let monthString = dateObj.monthLabel[mOnth];
let table = document.getElementById("contractTable");
let table2 = document.getElementById("mainTable");

document.getElementById("month").innerHTML = monthString;
document.getElementById("day").innerHTML = dAy;
document.getElementById("weekday").innerHTML = dOfWeek;

const loadFirst = () => {
  sortTable(1, table);
  sortTable(0, table2);
}

function sortTable(n, tableId) {                                            //Copied from w3Schools
  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;                                                         //Set the sorting direction to ascending:
  dir = "asc";                                                              //Make a loop that will continue until no switching has been done:
  while (switching) {
    switching = false;                                                      //start by saying: no switching is done
    rows = tableId.rows;                                                    //Loop through all table rows (except the first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;                                                 //start by saying there should be no switching
      x = rows[i].getElementsByTagName("TD")[n];                            //Get the two elements you want to compare, one from current row and one from the next
      y = rows[i + 1].getElementsByTagName("TD")[n];                        //check if the two rows should switch place based on the direction, asc or desc:
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {        //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;                                              //if so, mark as a switch and break the loop:
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);               //If a switch has been marked, make the switch and mark that a switch has been done:
      switching = true;
      switchcount ++;                                                      //Each time a switch is done, increase this count by 1:    
    } else {
      if (switchcount == 0 && dir == "asc") {                              //If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
        dir = "desc";
        switching = true;
      }
    }
  }
  flagElements(tableId);
}

function flagElements(tableS) {
	let rows = tableS.rows;
	let i;
	let n = new Date();
	for(i = 1; i < (rows.length-1); i++) {
	  let parts = tableS.rows[i].cells[1].innerHTML.split('/');
	  let mydate = new Date(parts[0], parts[1] - 1, parts[2]);
	  if((mydate - n) < 0) {                                                //if contract has expired
		  rows[i].style.color = "red";                                        //color the row in red
		  dateObj.expiring = dateObj.expiring + 1;                            //update the counter
		}
		else if((mydate - n) < 2592000000 && (mydate - n) > 0) {              //if contract is expiring
			rows[i].style.color = "orange";                                     //color the row in orange
			dateObj.soon = dateObj.soon + 1;                                    //update the counter
		}
	}
		document.getElementById("stat2").innerHTML = dateObj.expiring;                          //update the html lable
		document.getElementById("stat").innerHTML = siteCounter.rows.length-1-dateObj.expiring; //update the html lable
		document.getElementById("stat3").innerHTML = dateObj.soon;                              //update the html lable
}

function mySearchFunction() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("mainTable");
  tr = table.querySelectorAll("tr");
  for (let trCount of tr.length) {
    td = trCount.querySelector("td");
    if (td) {
      txtValue = td.textContent || td.innerText;
      (txtValue.toUpperCase().indexOf(filter) > -1) ? tr[i].style.display = "" : tr[i].style.display = "none" //is the search criteria contained in the td text? Here we are using indexOf to check
      }     
  }
}