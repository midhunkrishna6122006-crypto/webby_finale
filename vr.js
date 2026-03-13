// VR exploration for VOYAGEUR destinations using Pannellum 360°
// NOTE: Image URLs currently use the provided universal fallback; replace per-scene with
// real Wikimedia Commons equirectangular JPGs when available.

// Ensure GSAP ScrollTrigger is available if GSAP is loaded
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const VR_FALLBACK_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png';

// All 11 destinations with 3 scenes each
const vrScenes = {
  bali: [
    { label: 'Tanah Lot Temple', url: VR_FALLBACK_URL },
    { label: 'Tegallalang Rice Terraces', url: VR_FALLBACK_URL },
    { label: 'Uluwatu Cliff', url: VR_FALLBACK_URL }
  ],
  tokyo: [
    { label: 'Shibuya Crossing', url: VR_FALLBACK_URL },
    { label: 'Mount Fuji', url: VR_FALLBACK_URL },
    { label: 'Senso-ji Temple', url: VR_FALLBACK_URL }
  ],
  bangkok: [
    { label: 'Wat Phra Kaew', url: VR_FALLBACK_URL },
    { label: 'Phi Phi Islands', url: VR_FALLBACK_URL },
    { label: 'Chao Phraya River', url: VR_FALLBACK_URL }
  ],
  santorini: [
    { label: 'Oia Village', url: VR_FALLBACK_URL },
    { label: 'Santorini Caldera', url: VR_FALLBACK_URL },
    { label: 'Fira Cliffside', url: VR_FALLBACK_URL }
  ],
  paris: [
    { label: 'Eiffel Tower', url: VR_FALLBACK_URL },
    { label: 'Louvre Museum', url: VR_FALLBACK_URL },
    { label: 'Champs-Élysées', url: VR_FALLBACK_URL }
  ],
  rome: [
    { label: 'Colosseum', url: VR_FALLBACK_URL },
    { label: 'Vatican City', url: VR_FALLBACK_URL },
    { label: 'Trevi Fountain', url: VR_FALLBACK_URL }
  ],
  maldives: [
    { label: 'Crystal Lagoon', url: VR_FALLBACK_URL },
    { label: 'Underwater Reef', url: VR_FALLBACK_URL },
    { label: 'Overwater Bungalow View', url: VR_FALLBACK_URL }
  ],
  sydney: [
    { label: 'Sydney Opera House', url: VR_FALLBACK_URL },
    { label: 'Bondi Beach', url: VR_FALLBACK_URL },
    { label: 'Harbour Bridge', url: VR_FALLBACK_URL }
  ],
  safari: [
    { label: 'Maasai Mara Savanna', url: VR_FALLBACK_URL },
    { label: 'Mount Kilimanjaro', url: VR_FALLBACK_URL },
    { label: 'Amboseli Wildlife', url: VR_FALLBACK_URL }
  ],
  newyork: [
    { label: 'Times Square', url: VR_FALLBACK_URL },
    { label: 'Central Park', url: VR_FALLBACK_URL },
    { label: 'Brooklyn Bridge', url: VR_FALLBACK_URL }
  ],
  rio: [
    { label: 'Christ the Redeemer', url: VR_FALLBACK_URL },
    { label: 'Copacabana Beach', url: VR_FALLBACK_URL },
    { label: 'Sugarloaf Mountain', url: VR_FALLBACK_URL }
  ]
};

function loadScene(url, buttonEl) {
  const buttons = document.querySelectorAll('.vr-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  if (!window.pannellum) {
    // Pannellum not loaded; nothing more we can do
    return;
  }

  if (window._vrViewer) {
    try {
      window._vrViewer.destroy();
    } catch (e) {
      // ignore
    }
    const container = document.getElementById('panorama');
    if (container) container.innerHTML = '';
  }

  window._vrViewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: url,
    autoLoad: true,
    autoRotate: -2,
    showControls: true,
    mouseZoom: true,
    hfov: 100,
    showFullscreenCtrl: true
  });
}

function buildVRSection(destKey) {
  const scenes = vrScenes[destKey];
  if (!scenes || scenes.length === 0) return;

  const switcher = document.querySelector('.vr-scene-switcher');
  if (!switcher) return;

  scenes.forEach((scene, i) => {
    const btn = document.createElement('button');
    btn.className = 'vr-btn' + (i === 0 ? ' active' : '');
    btn.textContent = scene.label;
    btn.addEventListener('click', () => loadScene(scene.url, btn));
    switcher.appendChild(btn);
  });

  loadScene(scenes[0].url, switcher.querySelector('.vr-btn'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Derive destination key from body data-attribute or URL param
  let dest = (document.body.getAttribute('data-destination') || '').toLowerCase().trim();
  if (!dest) {
    const params = new URLSearchParams(window.location.search);
    dest = (params.get('destination') || '').toLowerCase().trim();
  }
  if (!dest || !vrScenes[dest]) {
    // default to Bali if nothing specified / invalid
    dest = 'bali';
  }
  document.body.setAttribute('data-destination', dest);

  buildVRSection(dest);

  // GSAP scroll animation for the VR section and buttons (if GSAP is present)
  if (window.gsap && window.ScrollTrigger) {
    gsap.from('#vrSection', {
      scrollTrigger: {
        trigger: '#vrSection',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.vr-btn', {
      scrollTrigger: {
        trigger: '.vr-scene-switcher',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
});


