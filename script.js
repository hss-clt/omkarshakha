// Define the Header Content
const headerContent = `
    <header>
        <nav>
            <a href="index.html">Home</a>
            <a href="balagokulam.html">Balagokulam</a>
            <a href="surya_namaskar.html">Surya Namaskar</a>
            <a href="sewa.html">Sewa</a>
            <a href="report.html">Report</a>
        </nav>
    </header>
`;

// Define the Footer Content
const footerContent = `
    <footer>
        <div class="footer-info">
            <p>Contact us: <a href="tel:+19803692983,1">+1 (980) 369-2983 ext:1</a>
            Follow us: <a href="https://www.facebook.com/cltomkar/" target="_blank">Facebook</a>
            &copy; 2025 Omkar Shakha All rights reserved.</p>
        </div>
    </footer>
`;

// Insert into the page
document.getElementById('header-placeholder').innerHTML = headerContent;
document.getElementById('footer-placeholder').innerHTML = footerContent;


const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfh8WhlDiSdrW5m0zyeh3ClHM8O6PUiwjpPGO-4BvGjhntZYDzcp6lLJ4cnpK5v4nbXuZkbE3mXXTY/pub?output=csv';

// Replace with your actual Spreadsheet ID (the long string in your URL)
const SPREADSHEET_ID = '1TQ43EAPutGvl75KovXx0wOtN979JDfAj_KBMIxxNeLQ';

async function loadSheetData() {
    const table = document.getElementById('data-table');
    const gid = table.getAttribute('data-gid'); // Detects the GID from HTML
    
    // Construct the specific CSV URL for that tab
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;

    try {
        const response = await fetch(url);
        const data = await response.text();
        const rows = data.split('\n').map(row => row.split(','));

        const headerRow = document.getElementById('table-header');
        const tableBody = document.getElementById('table-body');

        // Render Headers
        rows[0].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text.replace(/"/g, ""); // Removes extra quotes
            headerRow.appendChild(th);
        });

        // Render Rows
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length < 2) continue;
            const tr = document.createElement('tr');
            rows[i].forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.replace(/"/g, "");
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        }
    } catch (err) {
        console.error("Error loading data:", err);
    }
}

loadSheetData();