
(async function(){
  const res = await fetch('data/mock.json');
  const data = await res.json();

  const key = 'demo_requests';
  const local = JSON.parse(localStorage.getItem(key) || '[]');
  const all = [...data.requests, ...local];
  const users = data.users;

  // Populate HOP select
  const hopSelect = document.getElementById('hop-select');
  users.filter(u => u.role.includes('HOP')).forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id; opt.textContent = `${u.name} (${u.email})`;
    hopSelect.appendChild(opt);
  });

  const tbody = document.querySelector('#requests-table tbody');
  const statusFilter = document.getElementById('status-filter');

  function render(rows){
    tbody.innerHTML = '';
    rows.forEach(r => {
      const hop = users.find(u => u.id == r.assigned_hop_id);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.id}</td>
                      <td>${r.institution}</td>
                      <td><strong>${r.subject_code}</strong> — ${r.subject_name}</td>
                      <td><a href="${r.outline_url}" target="_blank">Outline</a></td>
                      <td><span class="badge ${r.status==='Pending'?'warn':r.status==='Rejected'?'err':'ok'}">${r.status}</span></td>
                      <td>${hop ? hop.name : '—'}</td>
                      <td>${formatDate(r.created_at)}</td>`;
      tbody.appendChild(tr);
    });
  }

  function apply(){
    const s = statusFilter.value;
    let rows = all.filter(r => !s || r.status === s);
    rows.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
    render(rows);
  }

  // Handle new submission (saved locally as a demo)
  document.getElementById('request-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.target;
    const obj = Object.fromEntries(new FormData(form).entries());
    const newReq = {
      id: (Math.max(0, ...all.map(r=>r.id)) + 1),
      requester_id: 999,
      institution: obj.institution,
      subject_code: obj.subject_code,
      subject_name: obj.subject_name,
      outline_url: obj.outline_url,
      status: 'Pending',
      assigned_hop_id: Number(obj.assigned_hop_id),
      created_at: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.push(newReq);
    localStorage.setItem(key, JSON.stringify(current));
    all.push(newReq);
    form.reset();
    apply();
    alert('Request saved locally (demo).');
  });

  statusFilter.addEventListener('change', apply);
  apply();
})();
