//Display scroll behavior
document.getElementById('show-selection').addEventListener('click', function() {
    const detailsDiv = document.getElementById('selection-details');

    // Show the details div if hidden
    if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block';

      // Scroll smoothly to the details div
      detailsDiv.scrollIntoView({ behavior: 'smooth' });
    }
  });


//Display scroll behavior
document.getElementById('random-select').addEventListener('click', function() {
    const detailsDiv = document.getElementById('selection-details');

    // Show the details div if hidden
    if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block';

      // Scroll smoothly to the details div
      detailsDiv.scrollIntoView({ behavior: 'smooth' });
    }
  });



// Constants
const totalTickets = 500;
const ticketPriceUSD = 2;
const ticketPriceVES = 250;

// State
const tickets = [];
let selectedTickets = new Set();

// Generate tickets
for (let i = 0; i < totalTickets; i++) {
    let id = i.toString().padStart(3, '0');
    // For demo, randomly assign some tickets as purchased or special
    // In real scenario, fetch this data from backend
    let type = 'available'; // default
    // For example, mark tickets with id ending with '00' as purchased
    if (i % 50 === 0) {
        type = 'purchased';
    } else if (i % 45 === 0) {
        type = 'special';
    }
    tickets.push({ id, type });
}

// DOM Elements
const ticketGrid = document.getElementById('ticket-grid');
const showSelectionBtn = document.getElementById('show-selection');
const randomSelectBtn = document.getElementById('random-select');
const randomCountInput = document.getElementById('random-count');
const selectionDetailsSection = document.getElementById('selection-details');
const selectedTicketsDiv = document.getElementById('selected-tickets');
const totalUsdSpan = document.getElementById('total-usd');
const totalVesSpan = document.getElementById('total-ves');

// Generate Ticket Buttons
tickets.forEach(ticket => {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.innerText = ticket.id;

    // Assign classes based on type
    if (ticket.type === 'purchased') {
        ticketDiv.classList.add('purchased');
    } else if (ticket.type === 'special') {
        ticketDiv.classList.add('special');
    } else {
        ticketDiv.classList.add('available');
    }

    // Add click event if not purchased
    if (ticket.type !== 'purchased') {
        ticketDiv.addEventListener('click', () => {
            const key = ticket.id;
            if (selectedTickets.has(key)) {
                selectedTickets.delete(key);
                ticketDiv.classList.remove('selected');
            } else {
                selectedTickets.add(key);
                ticketDiv.classList.add('selected');
            }
        });
    } else {
        // Purchased tickets are not selectable
        ticketDiv.style.cursor = 'not-allowed';
    }

    ticketGrid.appendChild(ticketDiv);
});

// Toggle menu on mobile
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Show selection details
showSelectionBtn.addEventListener('click', () => {
    displaySelection();
});

// Randomly select tickets
randomSelectBtn.addEventListener('click', () => {
    const count = parseInt(randomCountInput.value);
    selectRandomTickets(count);
});

// Function to display current selection
function displaySelection() {
    // Clear previous
    selectedTicketsDiv.innerHTML = '';

    if (selectedTickets.size === 0) {
        selectedTicketsDiv.innerText = 'No tickets selected.';
        document.getElementById('selection-details').style.display = 'block';
        updateTotals();
        return;
    }

    // List selected tickets
    selectedTickets.forEach(ticketId => {
        const ticket = tickets.find(t => t.id === ticketId);
        const span = document.createElement('span');
        span.innerText = ticketId + (ticket.type === 'special' ? ' (Special)' : '');
        span.style.display = 'block';
        selectedTicketsDiv.appendChild(span);
    });

    // Show totals
    document.getElementById('selection-details').style.display = 'block';
    updateTotals();
}

// Function to update totals
function updateTotals() {
    const count = selectedTickets.size;
    const totalUSD = count * ticketPriceUSD;
    const totalVES = count * ticketPriceVES;
    totalUsdSpan.innerText = totalUSD.toFixed(2);
    totalVesSpan.innerText = totalVES.toFixed(2);
}

// Function to select random tickets
function selectRandomTickets(count) {
    // Clear previous selections
    selectedTickets.clear();
    // Remove previous 'selected' class
    document.querySelectorAll('.ticket.selected').forEach(el => el.classList.remove('selected'));

    // Build list of available and special tickets
    const availableTickets = tickets.filter(t => t.type !== 'purchased');

    // Shuffle array
    for (let i = availableTickets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableTickets[i], availableTickets[j]] = [availableTickets[j], availableTickets[i]];
    }

    // Select the first 'count' tickets
    const selected = availableTickets.slice(0, count);
    selected.forEach(t => {
        selectedTickets.add(t.id);
        // Highlight selected tickets
        const ticketDiv = Array.from(ticketGrid.children).find(div => div.innerText === t.id);
        if (ticketDiv) {
            ticketDiv.classList.add('selected');
        }
    });
    displaySelection();
}

// Optional: Add styles for selected tickets
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .ticket.selected {
        outline: 3px solid #0000ff;
    }
`;
document.head.appendChild(styleSheet);



