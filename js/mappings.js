
(async function(){
  const res = await fetch('data/mock.json');
  const data = await res.json();

  const tbody = document.querySelector('#mappings-table tbody');
  const filterText = document.getElementById('filter-text');
  const filterRpl = document.getElementById('filter-rpl');

  function render(rows){
    tbody.innerHTML = '';
    rows.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${m.institution}</td>
                      <td><strong>${m.subject_code}</strong></td>
                      <td>${m.subject_name}</td>
                      <td>${m.koi_subject}</td>
                      <td><span class="badge">${m.rpl_type}</span></td>
                      <td>${m.comments || ''}</td>
                      <td><a href="${m.outline_url}" target="_blank">Outline</a></td>
                      <td><small>${formatDate(m.created_at)} / ${formatDate(m.updated_at)}</small></td>
                      <td><small>${m.added_by}</small></td>`;
      tbody.appendChild(tr);
    });
  }

  function apply(){
    const txt = filterText.value.toLowerCase();
    const rpl = filterRpl.value;
    let rows = data.mappings.filter(m => {
      const hay = `${m.institution} ${m.subject_code} ${m.subject_name} ${m.koi_subject}`.toLowerCase();
      const matchTxt = hay.includes(txt);
      const matchRpl = !rpl || m.rpl_type === rpl;
      return matchTxt && matchRpl;
    });
    // Sort by updated_at desc
    rows.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at));
    render(rows);
  }

  filterText.addEventListener('input', apply);
  filterRpl.addEventListener('change', apply);

  // Export
  document.getElementById('btn-export').addEventListener('click', ()=>{
    const rows = [['Institution','Subject Code','Subject Name','KOI Subject','RPL Type','Comments','Outline URL','Created','Updated','By']];
    $$('#mappings-table tbody tr').forEach(tr => {
      const cells = Array.from(tr.children).map(td => td.textContent.trim());
      rows.push(cells);
    });
    downloadCSV('mappings.csv', rows);
  });

  apply();
})();
