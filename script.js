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

        // Safety Check: If Google returns HTML instead of CSV (due to sharing permissions)
        if (csvData.includes('<!DOCTYPE html>')) {
            console.error("Access Denied: Check Google Sheet sharing settings.");
            return;
        }

        // --- THE FIX FOR COMMAS ---
        // This splits the CSV by lines, then splits each line by commas NOT inside quotes
        const rows = csvData.split(/\r?\n/).map(row => {
            // Regex: match commas only if they are not followed by an odd number of quotes
            return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        });

        const headerRow = document.getElementById('table-header');
        const tableBody = document.getElementById('table-body');

        // Clear existing content
        headerRow.innerHTML = '';
        tableBody.innerHTML = '';

        // Render Headers (First Row)
        if (rows.length > 0) {
            rows[0].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text.replace(/^"|"$/g, "").trim(); 
                headerRow.appendChild(th);
            });
        }

        // Render Data Rows
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length < 2) continue; // Skip empty rows
            
            const tr = document.createElement('tr');
            rows[i].forEach(cellText => {
                const td = document.createElement('td');
                
                // Remove surrounding quotes from the CSV field
                let cleanText = cellText.trim().replace(/^"|"$/g, '');

                // Check if the text contains an HTML link tag
                if (cleanText.toLowerCase().includes('<a href=')) {
                    td.innerHTML = cleanText; 
                } else {
                    td.textContent = cleanText;
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        }
    } catch (err) {
        console.error("Error loading data:", err);
    }
}

loadSheetData();