const buttons = [...document.querySelectorAll('[data-filter]')];
const sections = [...document.querySelectorAll('[data-section]')];
function applyFilter(filter, persist = false) {
 if (!buttons.some(button => button.dataset.filter === filter)) filter = 'all';
 buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
 let count = 0;
 sections.forEach(section => {
  const visible = filter === 'all' || section.dataset.section === filter;
  section.hidden = !visible;
  if (visible) count += section.querySelectorAll('[data-project]').length;
 });
 document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'projeto' : 'projetos'}`;
 if (persist) {
  const url = new URL(location.href);
  if (filter === 'all') url.searchParams.delete('area'); else url.searchParams.set('area', filter);
  history.replaceState(null, '', url);
 }
 requestAnimationFrame(updateCollections);
}
buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
function updateCollections() {
 document.querySelectorAll('[data-scroll]').forEach(button => {
  const rail = document.getElementById(button.getAttribute('aria-controls'));
  button.disabled = Number(button.dataset.scroll) < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
 });
}
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
 const rail = document.getElementById(button.getAttribute('aria-controls'));
 rail.scrollBy({left: Number(button.dataset.scroll) * rail.clientWidth * .82, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}));
document.querySelectorAll('.secondary-grid').forEach(rail => rail.addEventListener('scroll', updateCollections, {passive:true}));
window.addEventListener('resize', updateCollections, {passive:true});
window.addEventListener('pageshow', () => applyFilter(new URLSearchParams(location.search).get('area') || 'all'));
applyFilter(new URLSearchParams(location.search).get('area') || 'all');
