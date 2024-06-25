    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-form').addEventListener('submit', cadastrar);
});

function cadastrar(event) {
    event.preventDefault(); 

    const nome = document.getElementById('firstname').value;
    const sobrenome = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('phone').value;
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;

    if (!nome || !sobrenome || !email || !celular || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Email já cadastrado!');
        return;
    }

    const user = {
        nome,
        sobrenome,
        email,
        celular,
        senha: btoa(senha) 
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert('Usuário cadastrado com sucesso!');
    clearRegisterForm();
    window.location.href = 'login.html';
    
}

function clearRegisterForm() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
}





