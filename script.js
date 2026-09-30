const track = document.querySelector('.carousel-track');
const cards = [...document.querySelectorAll('.work-card')];
const dots = document.querySelector('.dots');
let current = 0;
let autoplay;

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Ir al trabajo ${i + 1}`);
  dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  dots.appendChild(dot);
});

function goTo(index){
  current = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===current));
}

function startAutoplay(){
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 4500);
}
function restartAutoplay(){ startAutoplay(); }

document.querySelector('.prev').addEventListener('click', () => { goTo(current - 1); restartAutoplay(); });
document.querySelector('.next').addEventListener('click', () => { goTo(current + 1); restartAutoplay(); });

const carousel = document.querySelector('[data-carousel]');
carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
carousel.addEventListener('mouseleave', startAutoplay);

let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; clearInterval(autoplay); }, {passive:true});
track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if(Math.abs(diff) > 45) goTo(current + (diff > 0 ? 1 : -1));
  startAutoplay();
}, {passive:true});

startAutoplay();
