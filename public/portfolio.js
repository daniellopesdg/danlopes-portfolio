(() => {
  const links = [...document.querySelectorAll('.portfolio-index nav a')];
  const sections = [...document.querySelectorAll('details.embed-section')];
  const mark = id => links.forEach(link => {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  function reveal(id, scroll = true) {
    const target = document.getElementById(id);
    const section = target?.closest('details.embed-section');
    if (!section) return false;
    section.open = true;
    mark(section.id);
    if (scroll) requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
    return true;
  }
  links.forEach(link => link.addEventListener('click', () => reveal(link.hash.slice(1))));
  window.addEventListener('hashchange', () => reveal(location.hash.slice(1)));
  const area = new URLSearchParams(location.search).get('area');
  const initialTarget = location.hash && location.hash !== '#projetos' ? location.hash.slice(1) : area;
  if (initialTarget && document.getElementById(initialTarget)?.closest('details.embed-section')) {
    sections.forEach(section => section.open = false);
    reveal(initialTarget);
  }
  sections.forEach(section => section.addEventListener('toggle', () => {
    if (section.open) mark(section.id);
    else {
      // Pause embedded Vimeo videos when their category is collapsed.
      section.querySelectorAll('iframe[src^="https://player.vimeo.com/"]').forEach(frame => {
        frame.contentWindow?.postMessage(JSON.stringify({method: 'pause'}), 'https://player.vimeo.com');
      });
    }
  }));
  if ('IntersectionObserver' in window) {
    const visible = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting));
      const current = sections.find(section => section.open && visible.get(section.id));
      if (current) mark(current.id);
    }, {rootMargin: '-12% 0px -45% 0px'});
    sections.forEach(section => observer.observe(section));
  }
})();
