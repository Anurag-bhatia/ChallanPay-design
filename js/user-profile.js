/* ==========================================================================
   User Profile — shared dropdown / logout logic
   Loaded on pages that have user profile UI (payment, dashboard, etc.)
   ========================================================================== */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // ── Populate user name from sessionStorage ────────────────────────
        var userName = sessionStorage.getItem('userName');
        if (userName) {
            var ids = ['userName', 'mobileUserName', 'mobileUserNameDisplay'];
            ids.forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.textContent = userName;
            });
        }

        // ── Desktop dropdown toggle ──────────────────────────────────────
        var profileBtn = document.getElementById('userProfileBtn');
        var profileDropdown = document.getElementById('userProfileDropdown');

        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = profileBtn.classList.toggle('active');
                profileDropdown.classList.toggle('active');
                profileBtn.setAttribute('aria-expanded', String(isOpen));
            });

            document.addEventListener('click', function (e) {
                if (!profileBtn.contains(e.target)) {
                    profileBtn.classList.remove('active');
                    profileDropdown.classList.remove('active');
                    profileBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Keyboard support
            profileBtn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    profileBtn.click();
                }
            });
        }

        // ── Mobile dropdown toggle ───────────────────────────────────────
        var mobileBtn = document.getElementById('mobileUserProfileBtn');
        var mobileDropdown = document.getElementById('mobileUserProfileDropdown');

        if (mobileBtn && mobileDropdown) {
            mobileBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = mobileBtn.classList.toggle('active');
                mobileDropdown.classList.toggle('active');
                mobileBtn.setAttribute('aria-expanded', String(isOpen));
            });

            document.addEventListener('click', function (e) {
                if (!mobileBtn.contains(e.target)) {
                    mobileBtn.classList.remove('active');
                    mobileDropdown.classList.remove('active');
                    mobileBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // ── Logout handler ───────────────────────────────────────────────
        function handleLogout(e) {
            e.preventDefault();
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userMobile');
            sessionStorage.removeItem('vehicleNumber');
            window.location.href = 'index.html';
        }

        ['logoutBtn', 'mobileLogoutBtn'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener('click', handleLogout);
        });
    });
})();
