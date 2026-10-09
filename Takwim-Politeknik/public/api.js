// ── Shared API helper ──────────────────────────────────────────────────────
const API_BASE = '';

const api = {
  _token() { return localStorage.getItem('token'); },

  async _req(method, url, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json', ...(this._token() ? { Authorization: `Bearer ${this._token()}` } : {}) }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + url, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `Ralat ${res.status}`);
    return json;
  },

  get(url)          { return this._req('GET',    url); },
  post(url, body)   { return this._req('POST',   url, body); },
  put(url, body)    { return this._req('PUT',    url, body); },
  delete(url)       { return this._req('DELETE', url); },
};

// ── Toast notification ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 3000);
}

// ── Auth guard ─────────────────────────────────────────────────────────────
function requireAuth(expectedRole) {
  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user') || 'null');
  if (!token || !user) { location.href = 'index.html'; return null; }
  if (expectedRole && user.role !== expectedRole) { location.href = 'index.html'; return null; }
  return user;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  location.href = 'index.html';
}

// ── Calendar renderer ──────────────────────────────────────────────────────
const MONTHS_MS = ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'];
const DAYS_MS   = ['Ahd','Isn','Sel','Rab','Kha','Jum','Sab'];

function renderCalendar(containerId, year, month, events, onDayClick) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  wrap.innerHTML = '';

  // Day headers
  DAYS_MS.forEach(d => {
    const h = document.createElement('div');
    h.className = 'cal-day-hdr';
    h.textContent = d;
    wrap.appendChild(h);
  });

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today      = new Date();

  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div');
    e.className = 'cal-cell empty';
    wrap.appendChild(e);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell   = document.createElement('div');
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dow    = new Date(year, month, d).getDay();

    cell.className = 'cal-cell';
    if (dow === 0 || dow === 6) cell.classList.add('weekend');
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear())
      cell.classList.add('today');

    const num = document.createElement('span');
    num.className = 'cal-num';
    num.textContent = d;
    cell.appendChild(num);

    // Events for this day
    const dayEvts = events.filter(ev => ev.event_date === dateStr || (ev.end_date && dateStr >= ev.event_date && dateStr <= ev.end_date));
    dayEvts.slice(0, 3).forEach(ev => {
      const b = document.createElement('span');
      b.className = `cal-evt badge-${ev.type}`;
      b.textContent = ev.title;
      b.title = ev.title;
      cell.appendChild(b);
    });

    if (onDayClick) cell.addEventListener('click', () => onDayClick(dateStr, dayEvts));
    wrap.appendChild(cell);
  }
}
