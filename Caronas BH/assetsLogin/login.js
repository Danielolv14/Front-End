document.getElementById('loginForm').addEventListener('submit', loginUser);

function loginUser(event) {
    event.preventDefault(); 

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const user = JSON.parse(localStorage.getItem(email));

    if (!user || atob(user.senha) !== senha) {
        alert('Email ou senha incorretos!');
        return;
    }

    localStorage.setItem('loggedInUser', email);
    window.location.href = 'index.html'; 
}