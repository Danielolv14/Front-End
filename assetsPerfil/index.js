document.addEventListener('DOMContentLoaded', () => {
  const loggedInUserEmail = localStorage.getItem('loggedInUser');
  if (!loggedInUserEmail) {
      window.location.href = 'login.html'; 
      return;
  }

  const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
  if (user) {
      document.getElementById('Nome').innerText = user.nome;
      document.getElementById('userName').innerText = user.nome;
      document.getElementById('lastname').innerText = user.sobrenome;
      document.getElementById('Email').innerText = user.email;
      document.getElementById('telefone').innerText = user.celular;

      if (user.rating) {
        document.querySelector(`input[name="rating"][value="${user.rating}"]`).checked = true;
    }

    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            user.rating = event.target.value;
            localStorage.setItem(loggedInUserEmail, JSON.stringify(user));
            alert(`Você avaliou ${user.rating} estrelas!`);
        });
    });
  }
});

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html'; 
}

  const inputName = document.getElementById('name');
  const textComment = document.getElementById('text');
  const form = document.getElementById('formulario');
  const commentPost = document.getElementById('comentario');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let p = document.createElement('p');
    p.style = 'color: black; background-color: white; border-radius: 10px; margin-top: 10px;'
    p.classList = 'p-4 d-flex text-wrap';
    p.innerHTML = `<strong>${inputName.value}: </strong> ${textComment.value}`;
    commentPost.appendChild(p);

  });



 