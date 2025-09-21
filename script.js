const LS_THEME_KEY  = 'site-theme';
const LS_ACCENT_KEY = 'site-accent';
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
  const int = parseInt(hex,16);
  return [(int>>16)&255,(int>>8)&255,int&255];
}
function getContrast(hex){
  const [r,g,b] = hexToRgb(hex);
  const yiq = (r*299+g*587+b*114)/1000;
  return yiq >= 140 ? '#0b1220' : '#ffffff';
}
function applyAccent(hex){
  const root = document.documentElement;
  const rgb = hexToRgb(hex);
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent-rgba', rgb.join(','));
  root.style.setProperty('--accent-contrast', getContrast(hex));
  qs('#swatch').style.background = hex;
  qs('#accentHex').textContent = hex.toLowerCase();
  qs('#contrastText').textContent = 'Text: ' + (getContrast(hex)==='#ffffff'?'white':'dark');
  qsa('.token').forEach(t=>{t.classList.add('pulse');setTimeout(()=>t.classList.remove('pulse'),400)});
}
function applyTheme(mode){
  const root=document.documentElement;
  qsa('.seg-btn').forEach(btn=>btn.setAttribute('aria-pressed',btn.dataset.theme===mode));
  let effective=mode;
  if(mode==='auto') effective=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  if(effective==='dark') root.setAttribute('data-theme','dark');
  else root.removeAttribute('data-theme');
}
document.addEventListener('DOMContentLoaded',()=>{
  const savedTheme=localStorage.getItem(LS_THEME_KEY)||'auto';
  const savedAccent=localStorage.getItem(LS_ACCENT_KEY)||'#0066ff';
  qs('#accentPicker').value=savedAccent;
  applyAccent(savedAccent);
  applyTheme(savedTheme);

  qsa('.seg-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      localStorage.setItem(LS_THEME_KEY,b.dataset.theme);
      applyTheme(b.dataset.theme);
    });
  });
  qs('#accentPicker').addEventListener('input',e=>{
    localStorage.setItem(LS_ACCENT_KEY,e.target.value);
    applyAccent(e.target.value);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{
    if(localStorage.getItem(LS_THEME_KEY)==='auto') applyTheme('auto');
  });
});
