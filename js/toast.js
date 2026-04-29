/* ==========================================================================
   Toast System, Field Error Helpers & Vehicle Number Validation
   ========================================================================== */

(function () {
    'use strict';

    // ── Toast Container ──────────────────────────────────────────────────
    let container;

    function getContainer() {
        if (!container || !container.parentElement) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }
        return container;
    }

    // SVG icons by type
    var ICONS = {
        success: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    /**
     * Show a toast notification.
     * @param {Object} opts
     * @param {'success'|'error'|'warning'|'info'} opts.type
     * @param {string} opts.title
     * @param {string} [opts.message]
     * @param {number} [opts.duration=4000] - ms before auto-dismiss (0 = manual)
     */
    function showToast(opts) {
        var type = opts.type || 'info';
        var duration = opts.duration !== undefined ? opts.duration : 4000;

        var toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.setAttribute('role', 'alert');
        toast.innerHTML =
            '<span class="toast-icon">' + (ICONS[type] || ICONS.info) + '</span>' +
            '<div class="toast-body">' +
                '<div class="toast-title">' + escapeHTML(opts.title) + '</div>' +
                (opts.message ? '<div class="toast-message">' + escapeHTML(opts.message) + '</div>' : '') +
            '</div>' +
            '<button class="toast-close" aria-label="Dismiss">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
            '</button>';

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', function () {
            dismissToast(toast);
        });

        getContainer().appendChild(toast);

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(function () {
                dismissToast(toast);
            }, duration);
        }

        return toast;
    }

    function dismissToast(toast) {
        if (!toast || !toast.parentElement) return;
        toast.classList.add('toast-exit');
        setTimeout(function () {
            if (toast.parentElement) toast.parentElement.removeChild(toast);
        }, 300);
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ── Inline Field Errors ──────────────────────────────────────────────

    /**
     * Show an inline error below a field.
     * @param {HTMLElement} input - The input element
     * @param {string} message - Error message to display
     */
    function showFieldError(input, message) {
        clearFieldError(input);
        input.classList.add('input-error');

        var errorEl = document.createElement('div');
        errorEl.className = 'field-error visible';
        errorEl.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' +
            '</svg>' +
            '<span>' + escapeHTML(message) + '</span>';

        // Insert after the input (or its wrapper)
        var parent = input.closest('.vehicle-input-container') ||
                     input.closest('.phone-input-wrapper') ||
                     input.closest('.form-group') ||
                     input.parentElement;
        parent.parentElement.insertBefore(errorEl, parent.nextSibling);
    }

    /**
     * Clear inline error for a field.
     * @param {HTMLElement} input
     */
    function clearFieldError(input) {
        input.classList.remove('input-error');

        var parent = input.closest('.vehicle-input-container') ||
                     input.closest('.phone-input-wrapper') ||
                     input.closest('.form-group') ||
                     input.parentElement;
        var next = parent.nextElementSibling;
        if (next && next.classList.contains('field-error')) {
            next.parentElement.removeChild(next);
        }
    }

    // ── Vehicle Number Validation ────────────────────────────────────────

    /**
     * Validate Indian vehicle registration number.
     * Accepts formats like: DL01AB1234, MH02BQ9876, UP32MM1113, KA51A1234
     * @param {string} value
     * @returns {boolean}
     */
    function isValidVehicleNumber(value) {
        var cleaned = value.replace(/[\s-]/g, '').toUpperCase();
        return /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/.test(cleaned);
    }

    // ── Public API ───────────────────────────────────────────────────────
    window.Toast = {
        show: showToast,
        success: function (title, message) {
            return showToast({ type: 'success', title: title, message: message });
        },
        error: function (title, message) {
            return showToast({ type: 'error', title: title, message: message });
        },
        warning: function (title, message) {
            return showToast({ type: 'warning', title: title, message: message });
        },
        info: function (title, message) {
            return showToast({ type: 'info', title: title, message: message });
        }
    };

    window.FieldError = {
        show: showFieldError,
        clear: clearFieldError
    };

    window.isValidVehicleNumber = isValidVehicleNumber;
})();
