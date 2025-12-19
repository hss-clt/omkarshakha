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

// Store assigned colors so the same person always has the same color
const colorMap = {};
const palette = ['#075e54', '#128c7e', '#34b7f1', '#25d366', '#3e6184', '#8e44ad', '#c0392b', '#d35400'];

function getColorForUser(name) {
    if (!colorMap[name]) {
        // Assign next color in palette
        const index = Object.keys(colorMap).length % palette.length;
        colorMap[name] = palette[index];
    }
    return colorMap[name];
}


<div class="whatsapp-header" style="background-color: ${getColorForUser(col5)};">
    ${col5}
</div>

// Google Sheets Config
const SPREADSHEET_ID = '1TQ43EAPutGvl75KovXx0wOtN979JDfAj_KBMIxxNeLQ';

async function loadSheetData() {
    const table = document.getElementById('data-table');
    if (!table) return;

    const gid = table.getAttribute('data-gid'); 
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;

    try {
        const response = await fetch(url);
        const csvData = await response.text();
        
        // Handle CSV split (ignoring commas inside quotes)
        const rows = csvData.split(/\r?\n/).map(row => {
            return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        });

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        // Inside your loadSheetData loop:
	for (let i = 1; i < rows.length; i++) {
    if (rows[i].length < 5) continue; 

    const col1 = rows[i][0].replace(/^"|"$/g, '').trim(); 
    const col5 = rows[i][4].replace(/^"|"$/g, '').trim(); 
    
    const tr = document.createElement('tr');
    const td = document.createElement('td');

    const userColor = getColorForUser(col5);

    td.innerHTML = `
        <div class="whatsapp-header" style="background-color: ${userColor};">
            ${col5}
        </div>
        <div class="message-bubble">
            <span class="col-bold">${col1}</span>
            <div class="message-content">${renderRemainingColumns(rows[i])}</div>
        </div>
    `;
    
    tr.appendChild(td);
    tableBody.appendChild(tr);
}
    } catch (err) {
        console.error("Error loading data:", err);
    }
}

function renderRemainingColumns(rowArray) {
    let html = '';
    // Process columns 2, 3, 4 (indices 1, 2, 3)
    for (let j = 1; j <= 3; j++) {
        if (rowArray[j]) {
            let text = rowArray[j].trim().replace(/^"|"$/g, '');
            // Check for hyperlinks
            if (text.toLowerCase().includes('<a href=')) {
                html += `<div class="col-data">${text}</div>`;
            } else {
                html += `<div class="col-data">${text}</div>`;
            }
        }
    }
    return html;
}

loadSheetData();