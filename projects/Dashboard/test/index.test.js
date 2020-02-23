//----------------------Running tests to verify the dashboard functionality----------------------------

const expect = chai.expect();

//--------------Testing the search functionality----------------------------

//Original search Function

const firstTable = '#newTable';

function mySearchFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById(firstTable);
    tr = table.querySelectorAll("tr");
    for (let trCount of tr.length) {
      td = trCount.querySelector("td");
      if (td) {
        txtValue = td.textContent || td.innerText;
        (txtValue.toUpperCase().indexOf(filter) > -1) ? tr[i].style.display = "" : tr[i].style.display = "none" //is the search criteria contained in the td text? Here we are using indexOf to check
        }     
    }
  }

  describe('Running Tests', () => {
      it('Expected output of 1', () => {
        
      });
  })

  
