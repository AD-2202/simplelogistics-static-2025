const form = document.getElementById('load-form');
const list = document.getElementById('load-list');
const search = document.getElementById('search');

let loads = JSON.parse(localStorage.getItem('loads')) || [];

function saveAndRender() {
  localStorage.setItem('loads', JSON.stringify(loads));
  renderLoads(loads);
}

function renderLoads(data) {
  list.innerHTML = '';
  data.forEach(load => {
    const li = document.createElement('li');
    li.textContent = `#${load.id} | ${load.description} → ${load.destination} (${load.weight}kg)`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const destination = document.getElementById('destination').value;
  const weight = document.getElementById('weight').value;
  const id = loads.length + 1;

  loads.push({ id, description, destination, weight });
  form.reset();
  saveAndRender();
});

search.addEventListener('input', () => {
  const filtered = loads.filter(l => l.destination.toLowerCase().includes(search.value.toLowerCase()));
  renderLoads(filtered);
});

// Initial render
renderLoads(loads);
