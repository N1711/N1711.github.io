const rowContainer = document.querySelector('#rowContainer');
const smallText = document.querySelector('.total');
// const allSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
let selectedSeats = 0;
let price = 0;

updateSeats();

rowContainer.addEventListener('click', e => {
    if(!e.target.classList.contains('occupied') && e.target.classList.contains('seat')) {
        // e.target.classList.toggle('selected');
        // price += +e.target.innerText.slice(1);
        // selectedSeats++;
        if(e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            price -= +e.target.innerText.slice(1);
            selectedSeats--;
        } else {
            e.target.classList.add('selected');
            price += +e.target.innerText.slice(1);
            selectedSeats++;
        }
        getBookedSeats();
        updateText();
    }
})

const updateText = () => {
    if(selectedSeats > 1) {
        smallText.innerText = `You have selected ${selectedSeats} tickets for the price of $${price}`;
    }
    else {
        smallText.innerText = `You have selected ${selectedSeats} ticket for the price of $${price}`; 
    }
    localStorage.setItem('price', price);
    localStorage.setItem('selectedSeats', selectedSeats);
}

const getBookedSeats = () => {
    const seatIndex = [];                                                       //pass this to the backend rather than the price and qty as these can be altered via CSR attaks or plain JS
    const booked = document.querySelectorAll('.row .seat.selected');
    const bookedIndex = [...booked].map(seat => [...allSeats].indexOf(seat));   //you can also pass the seat index to the DB and get the price from there. Qty and Price from the FrontEnd can be manipulated so not a good idea to use
    bookedIndex.forEach((Indx) => {
        if(Indx <= 9) {
            seatIndex.push('A'+(Indx+1));
        }
        else if(Indx >=10 && Indx <19) {
            seatIndex.push('B'+(Indx-9));
        }
        else if(Indx >= 20 && Indx <29) {
            seatIndex.push('C'+(Indx-19));
        }
        else if(Indx >= 30 && Indx <39) {
            seatIndex.push('D'+(Indx-29));
        }
        else if(Indx >= 40 && Indx <49) {
            seatIndex.push('E'+(Indx-39));
        }
        else if(Indx >= 50 && Indx <59) {
            seatIndex.push('F'+(Indx-49));
        }
    })
    localStorage.setItem('BookedSeats', JSON.stringify(bookedIndex));
    localStorage.setItem('Tickets', seatIndex);
}

function updateSeats() {
    const selectedSeat = JSON.parse(localStorage.getItem('BookedSeats'));
    const sNumber = localStorage.getItem('Tickets');
    const tPrice = localStorage.getItem('price');
    const quantity = localStorage.getItem('selectedSeats');
    if(selectedSeat !== null && selectedSeat.length > 0) {
        allSeats.forEach((seat, index) => {
            if(selectedSeat.indexOf(index) > -1) {
                seat.classList.add('occupied');
            }
        });
        document.querySelector('.header').innerText = `You have booked ${quantity} tickets for the price of $${tPrice}.
        Your seat numbers are ${sNumber}`;
    }
}