document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const category = body.dataset.category;
  if (!category) return;
  const key = `entries_${category}`;
  let entries = JSON.parse(localStorage.getItem(key) || '[]');

  const list = document.getElementById('entries-list');
  const form = document.getElementById('entry-form');
  const input = document.getElementById('entry-input');

  function renderEntries() {
    list.innerHTML = '';
    entries.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'entry-item';
      const span = document.createElement('span');
      span.textContent = entry;
      li.appendChild(span);
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        const newValue = prompt('Edit entry:', entry);
        if (newValue !== null && newValue.trim() !== '') {
          entries[index] = newValue.trim();
          localStorage.setItem(key, JSON.stringify(entries));
          renderEntries();
        }
      });
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        entries.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(entries));
        renderEntries();
      });
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  renderEntries();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      entries.push(value);
      localStorage.setItem(key, JSON.stringify(entries));
      renderEntries();
      input.value = '';
    }
  });
});
