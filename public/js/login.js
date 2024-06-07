document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.querySelector('#email-login').value.trim();
            const password = document.querySelector('#password-login').value.trim();

            if (email && password) {
                const response = await fetch('/api/users/login', { // Update to correct route if necessary
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/'); // Change to '/profile' since you don't have a '/dashboard'
                } else {
                    alert('Failed to log in. Check your email and password.');
                }
            }
        });
    }
});