const archiveData = [
  {
    title: 'Hormuz Stays Shut. Urea Doesn’t Care — Phosphates Do.',
    category: 'fertiliser',
    date: '2026-09-30',
    summary: 'Chinese urea supply is improving, but phosphate and sulphur remain the real pressure points while Gulf cargo remains disrupted.',
    href: 'fertiliser/2026-09-30-morning-brief.html',
    tags: ['urea', 'phosphate', 'gulf']
  },
  {
    title: 'Wheat Export Pressure With Weak Freight and Softening Ocean Rates',
    category: 'commodity',
    date: '2026-09-29',
    summary: 'Wheat continues to see export momentum, but freight costs and vessel availability are reshaping margin assumptions.',
    href: 'commodity/2026-09-29-wheat-weekly.html',
    tags: ['wheat', 'export', 'freight']
  },
  {
    title: 'Hormuz Diesel Squeeze Weekly',
    category: 'energy',
    date: '2026-09-29',
    summary: 'Diesel remains the first cost shock to hit logistics networks, even if the headline crude market moves more slowly.',
    href: 'energy/2026-09-29-hormuz-diesel-weekly.html',
    tags: ['diesel', 'oil', 'shipping']
  },
  {
    title: 'Urea Market Rebalance',
    category: 'fertiliser',
    date: '2026-09-24',
    summary: 'China export allowance and Indian tender coverage are changing the nitrogen narrative.',
    href: 'fertiliser/2026-09-24-urea-rebalance.html',
    tags: ['urea', 'india', 'china']
  },
  {
    title: 'Commodity Macro Weekly',
    category: 'commodity',
    date: '2026-09-22',
    summary: 'A broad look at the macro backdrop affecting grain, freight and price transmission.',
    href: 'commodity/2026-09-22-macro-weekly.html',
    tags: ['macro', 'grain', 'trade']
  },
  {
    title: 'Brent Risk Premium Brief',
    category: 'energy',
    date: '2026-09-21',
    summary: 'Crude remains volatile as shipping and Gulf outflows keep risk premiums elevated.',
    href: 'energy/2026-09-21-brent-risk-premium.html',
    tags: ['brent', 'risk', 'shipping']
  }
];

const filterButtons = document.querySelectorAll('.filter-pill');
const listEl = document.querySelector('#archiveList');
const searchInput = document.querySelector('#searchInput');

let activeCategory = 'all';

function renderArchive() {
  const query = (searchInput?.value || '').trim().toLowerCase();

  const filtered = archiveData.filter((entry) => {
    const matchesCategory = activeCategory === 'all' || entry.category === activeCategory;
    const haystack = `${entry.title} ${entry.summary} ${entry.tags.join(' ')}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  if (!listEl) return;

  if (!filtered.length) {
    listEl.innerHTML = '<div class="archive-empty">No reports match the current search. Try a different keyword or category.</div>';
    return;
  }

  listEl.innerHTML = filtered.map((entry) => `
    <article class="list-item">
      <div class="date">${entry.date}</div>
      <div>
        <h3><a href="${entry.href}">${entry.title}</a></h3>
        <p>${entry.summary}</p>
      </div>
      <div class="tag">${entry.category}</div>
    </article>
  `).join('');
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
    renderArchive();
  });
});

searchInput?.addEventListener('input', renderArchive);

renderArchive();
