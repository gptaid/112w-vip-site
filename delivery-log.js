document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('delivery-form');
  const tableBody = document.querySelector('#delivery-table tbody');
  // Key for localStorage
  const storageKey = 'entries_delivery_log';
  // Retrieve existing entries or start with an empty array
  let entries = [];
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      entries = JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to parse stored delivery log', err);
  }

  // Render all entries into the table
  function renderEntries() {
    tableBody.innerHTML = '';
    entries.forEach((entry, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.date || ''}</td>
        <td>${entry.carrier || ''}</td>
        <td>${entry.type || ''}</td>
        <td>${entry.sender || ''}</td>
        <td>${entry.recipient || ''}</td>
        <td>${entry.disposition || ''}</td>
        <td>${entry.agent || ''}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Save current entries to localStorage
  function saveEntries() {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }

  // Handle form submission to add a new entry
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEntry = {
      date: document.getElementById('date-input').value,
      carrier: document.getElementById('carrier-input').value.trim(),
      type: document.getElementById('type-input').value.trim(),
      sender: document.getElementById('sender-input').value.trim(),
      recipient: document.getElementById('recipient-input').value.trim(),
      disposition: document.getElementById('disposition-input').value.trim(),
      agent: document.getElementById('agent-input').value.trim(),
    };
    entries.push(newEntry);
    saveEntries();
    renderEntries();
    form.reset();
  });

  // Handle click events for edit and delete buttons within the table
  tableBody.addEventListener('click', function(e) {
    const target = e.target;
    const index = target.dataset.index;
    if (!index) return;
    if (target.classList.contains('delete-btn')) {
      // Delete entry
      entries.splice(index, 1);
      saveEntries();
      renderEntries();
    } else if (target.classList.contains('edit-btn')) {
      // Edit entry
      const entry = entries[index];
      const newDate = prompt('Edit Date', entry.date) || entry.date;
      const newCarrier = prompt('Edit Carrier', entry.carrier) || entry.carrier;
      const newType = prompt('Edit Delivery Type', entry.type) || entry.type;
      const newSender = prompt('Edit Sender', entry.sender) || entry.sender;
      const newRecipient = prompt('Edit Recipient', entry.recipient) || entry.recipient;
      const newDisposition = prompt('Edit Disposition', entry.disposition) || entry.disposition;
      const newAgent = prompt('Edit Agent', entry.agent) || entry.agent;
      entries[index] = {
        date: newDate,
        carrier: newCarrier,
        type: newType,
        sender: newSender,
        recipient: newRecipient,
        disposition: newDisposition,
        agent: newAgent,
      };
      saveEntries();
      renderEntries();
    }
  });

  // Initial render
  renderEntries();
});
