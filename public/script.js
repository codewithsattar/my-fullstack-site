const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  const result = await response.json();
  if (result.success) {
    form.reset();
    loadUsers();
  }
});

async function loadUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();

  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

loadUsers();
