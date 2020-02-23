//----------------------Running tests to verify the dashboard functionality----------------------------

const expect = chai.expect;

//--------------Testing the search functionality----------------------------

beforeEach(() => {
    document.querySelector('#myInput').value = "";
})

//Original sort Function - first test found a bug in the loop

const firstTable = '#newTable';
const secondTable = document.querySelector('#oldTable');

function sortTable(n, tableId) {                                           
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;                                                         
    dir = "asc";                                                              
    while (switching) {
      switching = false;                                                      
      rows = tableId.rows;                                                    
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;                                                 
        x = rows[i].getElementsByTagName("TD")[n];                            
        y = rows[i + 1].getElementsByTagName("TD")[n];                        
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {        
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;                                              
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);              
        switching = true;
        switchcount ++;                                                         
      } else {
        if (switchcount == 0 && dir == "asc") {                              
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  //flag Elements
  
  function flagElements(tableS) {
	let rows = tableS.rows;
	let i;
	let n = new Date();
	for(i = 1; i < (rows.length-1); i++) {
	  let parts = tableS.rows[i].cells[1].innerHTML.split('/');
	  let mydate = new Date(parts[0], parts[1] - 1, parts[2]);
	  if((mydate - n) < 0) {                                                
		  rows[i].style.color = "red";                                                                  
		}
		else if((mydate - n) < 2592000000 && (mydate - n) > 0) {              
			rows[i].style.color = "orange";                                                                       
		}
	}                            
}

//Original search Function - first test found a bug in the loop

function mySearchFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById('newTable');
    tr = table.querySelectorAll("tr");
    for (i=0;i<tr.length;i++) {
      td = tr[i].querySelectorAll("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        (txtValue.toUpperCase().indexOf(filter) > -1) ? tr[i].style.display = "" : tr[i].style.display = "none";
        }     
    }
  }

  describe('Running Tests', async () => {
      it('Expected output of 1', () => {
          //Testing the search functionality
        const rowLength = document.querySelector('#newTable').rows.length;
        document.querySelector('#myInput').value = "Customer 1";
        mySearchFunction();
        expect(document.querySelector('#newTable').rows.length).to.equal(rowLength);
      });
      it('Expected output of Customer 3', () => {
          sortTable(0, document.querySelector('#newTable'));
          expect(document.querySelector('#newTable').rows[1].cells[0].innerText).to.equal('Customer 3');
      });
      it('Expected Output of orange', () => {
          flagElements(secondTable);
          expect(secondTable.rows[2].style.color).to.equal('orange');
      })
  })

  
