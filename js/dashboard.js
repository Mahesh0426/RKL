
(async function(){
  const res = await fetch('data/mock.json');
  const data = await res.json();

  // KPIs
  const institutions = new Set(data.mappings.map(m => m.institution));
  document.getElementById('kpi-institutions').textContent = institutions.size;
  document.getElementById('kpi-mappings').textContent = data.mappings.length;

  const byType = data.mappings.reduce((acc, m)=> (acc[m.rpl_type]=(acc[m.rpl_type]||0)+1, acc), {});
  document.getElementById('kpi-by-type').textContent = Object.entries(byType).map(([k,v])=> `${k}: ${v}`).join(' • ');

  const pending = data.requests.filter(r => r.status === 'Pending').length;
  document.getElementById('kpi-pending').textContent = pending;

  // Conflicts (mock): fabricate one sample conflict using mapping #1
  const tbody = document.querySelector('#conflicts-table tbody');
  const conflict = {
    institution: data.mappings[0].institution,
    subject_code: data.mappings[0].subject_code,
    existing: data.mappings[0].koi_subject,
    incoming: 'IT105'
  };
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${conflict.institution}</td>
                  <td>${conflict.subject_code}</td>
                  <td><span class="badge warn">${conflict.existing}</span></td>
                  <td><span class="badge err">${conflict.incoming}</span></td>
                  <td><button class="btn secondary">Keep Existing</button>
                      <button class="btn">Use New</button></td>`;
  tbody.appendChild(tr);
})();
