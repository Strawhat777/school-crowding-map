const areaEls = document.querySelectorAll('.area');
const selectedNameEl = document.getElementById('selectedName');
const selectedStatusEl = document.getElementById('selectedStatus');
const selectedPeopleEl = document.getElementById('selectedPeople');
const mostCrowdedEl = document.getElementById('mostCrowded');
const leastCrowdedEl = document.getElementById('leastCrowded');

const crowdLevels = {
  low: { label: 'Low', people: '10 students' },
  medium: { label: 'Moderate', people: '24 students' },
  high: { label: 'High', people: '38 students' }
};

function getAreaStatus(areaElement) {
  return areaElement.dataset.status;
}

function updateSelectedArea(areaElement) {
  const name = areaElement.dataset.area;
  const status = getAreaStatus(areaElement);
  const { label, people } = crowdLevels[status];

  selectedNameEl.textContent = name;
  selectedStatusEl.textContent = label;
  selectedStatusEl.className = `status-badge ${status}`;
  selectedPeopleEl.textContent = people;
}

function updateSummary() {
  const areas = Array.from(areaEls).map((area) => ({
    name: area.dataset.area,
    status: getAreaStatus(area)
  }));

  const order = { low: 1, medium: 2, high: 3 };

  const mostCrowded = [...areas].sort((a, b) => order[b.status] - order[a.status])[0].name;
  const leastCrowded = [...areas].sort((a, b) => order[a.status] - order[b.status])[0].name;

  mostCrowdedEl.textContent = mostCrowded;
  leastCrowdedEl.textContent = leastCrowded;
}

areaEls.forEach((area) => {
  area.addEventListener('click', () => {
    areaEls.forEach((item) => item.classList.remove('selected'));
    area.classList.add('selected');
    updateSelectedArea(area);
  });
});

document.querySelectorAll('.level-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedArea = document.querySelector('.area.selected') || document.querySelector('.corridor');

    selectedArea.dataset.status = button.dataset.level;
    selectedArea.classList.remove('low', 'medium', 'high');
    selectedArea.classList.add(button.dataset.level);

    updateSelectedArea(selectedArea);
    updateSummary();
  });
});

updateSummary();
updateSelectedArea(document.querySelector('.area.selected'));
