var users = [
    {
        email: "admin@gmail.com",
        password: "admin123" 
    },
    {
        email: "test@gmail.com",
        password: "test123"
    }
];

const form = document.getElementById('form-1');
if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //Get the 
        const userEmail = document.getElementById('email');
        const userPassword = document.getElementById('password');
        for(var i = 0; i < users.length; i++) {
            if(userEmail.value === users[i].email && userPassword.value === users[i].password) {
                form.reset();
                window.location.href = "user-page.html";
                return;
            }
        }
        alert('Your email or password is incorrect.');
        form.reset();
    });
}
