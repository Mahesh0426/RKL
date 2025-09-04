
(function(){
  // Theme
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') root.classList.add('light');

  function toggleTheme(){
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  }

  // Header/Footer Injection
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  const nav = [
    { href: 'index.html', label: 'Home' },
    { href: 'dashboard.html', label: 'Dashboard' },
    { href: 'mappings.html', label: 'Mappings' },
    { href: 'requests.html', label: 'Requests' },
    { href: 'users.html', label: 'Users' },
    { href: 'contact.html', label: 'Contact' },
  ];

  function navHTML(activePath) {
    return `
      <div class="navbar">
        <div class="navbar-inner">
          <a href="index.html" class="brand"><img src="assets/logo.svg" alt="Logo"/>RPL Mapping System</a>
          <nav class="nav">
            ${nav.map(n => `<a href="${n.href}" class="${activePath.endsWith(n.href) ? 'active' : ''}">${n.label}</a>`).join('')}
            <button class="toggle" id="theme-toggle" title="Toggle theme">🌗 Theme</button>
          </nav>
        </div>
      </div>
    `;
  }

  if (header) header.innerHTML = navHTML(location.pathname);

  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <div style="display:flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <div>© ${year} RPL Mapping System — Static Prototype</div>
          <div><small class="mono">Client-side demo • No backend • Mock data</small></div>
        </div>
      </div>
    `;
  }

  document.addEventListener('click', (e)=>{
    if (e.target && e.target.id === 'theme-toggle') toggleTheme();
  });

  // Utility helpers
  window.$ = (sel, root=document) => root.querySelector(sel);
  window.$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  window.formatDate = (iso) => new Date(iso).toLocaleDateString();
  window.downloadCSV = (filename, rows) => {
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
})();
