(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const fine = matchMedia('(hover: hover) and (pointer: fine)');
 let paused = reduced.matches;
 const toggle = document.querySelector('.motion-toggle');
 const apply = () => {
  document.body.classList.toggle('motion-paused', paused);
  if (toggle) {
   toggle.setAttribute('aria-pressed', String(paused));
   toggle.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
   toggle.title = paused ? 'Retomar animações' : 'Pausar animações';
   toggle.textContent = paused ? '▶' : 'Ⅱ';
  }
 };
 toggle?.addEventListener('click', () => { paused = !paused; apply(); });
 reduced.addEventListener('change', () => { paused = reduced.matches; apply(); });
 apply();
 const cards = document.querySelectorAll('.featured-grid .project');
 if ('IntersectionObserver' in window) {
  const entrance = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) {
    if (!paused && !reduced.matches) entry.target.classList.add('project-arrive');
    entrance.unobserve(entry.target);
   }
  }), {threshold:.12});
  cards.forEach(card => entrance.observe(card));
 }
 cards.forEach(card => {
  const link = card.querySelector('a');
  card.addEventListener('pointermove', event => {
   if (!fine.matches || paused || reduced.matches) return;
   const rect = card.getBoundingClientRect();
   link.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height/2) / rect.height * 3}deg`);
   link.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width/2) / rect.width * 3}deg`);
  });
  card.addEventListener('pointerleave', () => {
   link.style.setProperty('--tilt-x', '0deg');link.style.setProperty('--tilt-y', '0deg');
  });
 });
 const rails = [...document.querySelectorAll('.secondary-grid')].map(element => ({element,direction:1,hover:false,until:0,visible:false,pending:0}));
 const visibility = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
  const rail = rails.find(rail => rail.element === entry.target);if (rail) rail.visible = entry.isIntersecting;
 }), {threshold:.1}) : null;
 rails.forEach(rail => {
  visibility?.observe(rail.element);
  rail.element.addEventListener('pointerenter', () => {rail.hover=true;});
  rail.element.addEventListener('pointerleave', () => {rail.hover=false;});
  ['pointerdown','wheel','keydown','touchstart'].forEach(type => rail.element.addEventListener(type, () => {rail.until=performance.now()+6000;}, {passive:true}));
  document.querySelectorAll(`[aria-controls="${rail.element.id}"]`).forEach(button => button.addEventListener('click', () => {rail.until=performance.now()+6000;}));
 });
 let previous=0;
 function glide(time) {
  const delta=Math.min(time-previous,50);previous=time;
  if (!paused && !reduced.matches && !document.hidden) rails.forEach(rail => {
   const el=rail.element;
   if (!rail.visible || rail.hover || time<rail.until || el.contains(document.activeElement) || !el.getClientRects().length) return;
   const max=el.scrollWidth-el.clientWidth;
   if (max<=2) return;
   el.style.scrollSnapType='none';
   if (el.scrollLeft>=max-1) rail.direction=-1;
   if (el.scrollLeft<=0) rail.direction=1;
   rail.pending+=delta*.022;
   if (rail.pending>=1) { const pixels=Math.floor(rail.pending);el.scrollLeft+=rail.direction*pixels;rail.pending-=pixels; }
  });
  requestAnimationFrame(glide);
 }
 if (rails.length) requestAnimationFrame(glide);
})();
