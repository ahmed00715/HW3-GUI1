document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tableForm');
    const errorMessage = document.getElementById('errorMessage');
    const tableContainer = document.getElementById('tableContainer');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateTable();
    });

    function validateInput(value, fieldName) {
        value = value.trim();
        
        if (value === '') {
            throw new Error(`${fieldName} cannot be empty`);
        }
        
        const num = Number(value);
        
        if (isNaN(num)) {
            throw new Error(`${fieldName} must be a valid number`);
        }
        
        if (!Number.isInteger(num)) {
            throw new Error(`${fieldName} must be an integer`);
        }
        
        if (num < -50 || num > 50) {
            throw new Error(`${fieldName} must be between -50 and 50 to ensure performance`);
        }
        
        return num;
    }

    function validateRange(start, end, fieldName) {
        if (end < start) {
            throw new Error(`${fieldName} End must be greater than or equal to ${fieldName} Start`);
        }
        
        if (Math.abs(end - start) > 50) {
            throw new Error(`${fieldName} range cannot exceed 50 numbers to ensure performance`);
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        tableContainer.style.display = 'none';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function generateTable() {
        try {
            const multiplierStart = validateInput(document.getElementById('multiplierStart').value, 'Multiplier Start');
            const multiplierEnd = validateInput(document.getElementById('multiplierEnd').value, 'Multiplier End');
            const multiplicandStart = validateInput(document.getElementById('multiplicandStart').value, 'Multiplicand Start');
            const multiplicandEnd = validateInput(document.getElementById('multiplicandEnd').value, 'Multiplicand End');

            validateRange(multiplierStart, multiplierEnd, 'Multiplier');
            validateRange(multiplicandStart, multiplicandEnd, 'Multiplicand');

            hideError();

            const totalCells = (multiplierEnd - multiplierStart + 1) * (multiplicandEnd - multiplicandStart + 1);
            if (totalCells > 100) {
                tableContainer.innerHTML = '<div class="loading">Generating large table, please wait...</div>';
            }

            setTimeout(() => {
                const table = document.getElementById('multiplicationTable');
                table.innerHTML = '';

                const headerRow = document.createElement('tr');
                const cornerCell = document.createElement('th');
                cornerCell.className = 'corner-cell';
                headerRow.appendChild(cornerCell);

                for (let i = multiplicandStart; i <= multiplicandEnd; i++) {
                    const th = document.createElement('th');
                    th.textContent = i;
                    headerRow.appendChild(th);
                }
                table.appendChild(headerRow);

                for (let i = multiplierStart; i <= multiplierEnd; i++) {
                    const row = document.createElement('tr');
                    
                    const th = document.createElement('th');
                    th.textContent = i;
                    row.appendChild(th);
                    
                    for (let j = multiplicandStart; j <= multiplicandEnd; j++) {
                        const td = document.createElement('td');
                        td.textContent = i * j;
                        row.appendChild(td);
                    }
                    
                    table.appendChild(row);
                }

                tableContainer.style.display = 'block';
            }, 0);

        } catch (error) {
            showError(error.message);
        }
    }
});