/**
 * Challan Status Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    loadVehicleInfo();
    initTabs();
    initCheckboxes();
    initSelectAll();
});

/**
 * Load vehicle information from URL parameters
 */
function loadVehicleInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleNumber = urlParams.get('vehicle');

    if (vehicleNumber) {
        const vehicleNumberElement = document.getElementById('vehicleNumber');
        if (vehicleNumberElement) {
            vehicleNumberElement.textContent = vehicleNumber.toUpperCase();
        }
    }
}

/**
 * Initialize tab switching functionality
 */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get tab type
            const tabType = this.dataset.tab;

            // Filter challans based on tab (placeholder for actual filtering)
            console.log('Filtering challans by:', tabType);

            // In a real implementation, you would filter the challan cards here
            // based on the tab type (all, online, court)
        });
    });
}

/**
 * Initialize individual checkbox functionality
 */
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.challan-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedCount();
            updateTotalAmount();
            updateSelectAllState();
        });
    });
}

/**
 * Initialize select all checkbox
 */
function initSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.challan-checkbox');

            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });

            updateSelectedCount();
            updateTotalAmount();
        });
    }
}

/**
 * Update the selected count display
 */
function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.challan-checkbox');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    const countElement = document.getElementById('selectedCount');
    if (countElement) {
        countElement.textContent = checkedCount;
    }
}

/**
 * Update the total amount based on selected challans
 */
function updateTotalAmount() {
    const checkboxes = document.querySelectorAll('.challan-checkbox');
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Get the amount from the card
            const card = checkbox.closest('.challan-card');
            const amountElement = card.querySelector('.challan-amount');
            if (amountElement) {
                // Extract number from ₹2000 format
                const amount = parseInt(amountElement.textContent.replace(/[^\d]/g, ''));
                total += amount;
            }
        }
    });

    const totalElement = document.getElementById('totalAmount');
    if (totalElement) {
        totalElement.textContent = `₹${total}`;
    }
}

/**
 * Update select all checkbox state based on individual checkboxes
 */
function updateSelectAllState() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.challan-checkbox');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    if (selectAllCheckbox) {
        if (checkedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCount === checkboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }
}

/**
 * Copy challan ID to clipboard
 */
function copyChallanId(button) {
    const challanIdElement = button.previousElementSibling;
    const challanId = challanIdElement.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(challanId).then(() => {
        // Visual feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        button.style.color = '#10B981';

        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy challan ID');
    });
}

/**
 * Sidebar navigation
 */
const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        sidebarItems.forEach(i => i.classList.remove('active'));

        // Add active class to clicked item
        this.classList.add('active');

        // Update icon colors
        const paidIcon = this.querySelector('.paid-icon');
        if (paidIcon) {
            paidIcon.style.background = '#10B981';
        }
    });
});

/**
 * Proceed button click handler
 */
const proceedBtn = document.querySelector('.proceed-btn');
if (proceedBtn) {
    proceedBtn.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.challan-checkbox');
        const selectedChallans = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => {
                const card = cb.closest('.challan-card');
                const idElement = card.querySelector('.challan-id span');
                return idElement ? idElement.textContent : null;
            })
            .filter(id => id !== null);

        if (selectedChallans.length === 0) {
            alert('Please select at least one challan to proceed');
            return;
        }

        console.log('Proceeding with challans:', selectedChallans);
        // In a real implementation, this would navigate to payment page
        // window.location.href = '/payment.html?challans=' + selectedChallans.join(',');
    });
}
