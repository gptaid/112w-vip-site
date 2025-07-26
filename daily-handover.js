document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('handover-form');
  const tableBody = document.querySelector('#handover-table tbody');
  const storageKey = 'entries_daily_handover';
  let entries = [];

  // Load existing entries from localStorage
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      entries = JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to parse stored daily handover entries', err);
  }

  function saveEntries() {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }

  function renderEntries() {
    tableBody.innerHTML = '';
    entries.forEach((entry, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.event || ''}</td>
        <td>${entry.comments || ''}</td>
        <td>${entry.date || ''}</td>
        <td>${entry.shift || ''}</td>
        <td>${entry.agent || ''}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEntry = {
      event: document.getElementById('event-input').value.trim(),
      comments: document.getElementById('comments-input').value.trim(),
      date: document.getElementById('date-input').value,
      shift: document.getElementById('shift-input').value.trim(),
      agent: document.getElementById('agent-input').value.trim(),
    };
    entries.push(newEntry);
    saveEntries();
    renderEntries();
    form.reset();
  });

  tableBody.addEventListener('click', function(e) {
    const target = e.target;
    const indexAttr = target.getAttribute('data-index');
    if (indexAttr === null) return;
    const index = parseInt(indexAttr, 10);
    if (target.classList.contains('delete-btn')) {
      entries.splice(index, 1);
      saveEntries();
      renderEntries();
    } else if (target.classList.contains('edit-btn')) {
      const entry = entries[index];
      const newEvent = prompt('Edit Event', entry.event) || entry.event;
      const newComments = prompt('Edit Comments', entry.comments) || entry.comments;
      const newDate = prompt('Edit Date', entry.date) || entry.date;
      const newShift = prompt('Edit Shift', entry.shift) || entry.shift;
      const newAgent = prompt('Edit Agent', entry.agent) || entry.agent;
      entries[index] = {
        event: newEvent,
        comments: newComments,
        date: newDate,
        shift: newShift,
        agent: newAgent,
      };
      saveEntries();
      renderEntries();
    }
  });

  // Initial render
  renderEntries();
});
