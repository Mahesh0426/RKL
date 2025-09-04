
(async function(){
  const res = await fetch('data/mock.json');
  const data = await res.json();

  const tbody = document.querySelector('#users-table tbody');
  data.users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.name}</td>
                    <td>${u.email}</td>
                    <td><span class="badge">${u.role}</span></td>
                    <td>${formatDate(u.created_at)}</td>`;
    tbody.appendChild(tr);
  });
})();
