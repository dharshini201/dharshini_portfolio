import * as THREE from 'three';

// Cache generated textures so they are created only once
const textureCache = new Map();

/**
 * Noise helper: simple pseudo-random value noise
 */
function pseudoNoise(x, y, seed = 1) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x, y, seed = 1) {
  const iX = Math.floor(x);
  const iY = Math.floor(y);
  const fX = x - iX;
  const fY = y - iY;

  // Smoothstep interpolation
  const uX = fX * fX * (3 - 2 * fX);
  const uY = fY * fY * (3 - 2 * fY);

  const n00 = pseudoNoise(iX, iY, seed);
  const n10 = pseudoNoise(iX + 1, iY, seed);
  const n01 = pseudoNoise(iX, iY + 1, seed);
  const n11 = pseudoNoise(iX + 1, iY + 1, seed);

  const top = n00 * (1 - uX) + n10 * uX;
  const bottom = n01 * (1 - uX) + n11 * uX;
  return top * (1 - uY) + bottom * uY;
}

function fbm(x, y, octaves = 5, seed = 1) {
  let val = 0;
  let freq = 1;
  let amp = 0.5;
  let totalAmp = 0;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x * freq, y * freq, seed + i * 17) * amp;
    totalAmp += amp;
    freq *= 2;
    amp *= 0.5;
  }
  return val / totalAmp;
}

/**
 * Generate Glowing Animated Sun Texture
 */
export function getSunTexture() {
  if (textureCache.has('sun')) return textureCache.get('sun');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      // Solar turbulence
      const n1 = fbm(nx * 14, ny * 14, 5, 42);
      const n2 = fbm(nx * 28 + n1 * 2, ny * 28 + n1 * 2, 4, 99);
      const plasma = (n1 * 0.6 + n2 * 0.4);

      // Solar flares / hotspots
      const r = Math.min(255, Math.floor(255 * (0.85 + plasma * 0.3)));
      const g = Math.min(255, Math.floor(140 + plasma * 115));
      const b = Math.min(255, Math.floor(20 + plasma * 70));

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Add coronal flare spots
  for (let i = 0; i < 18; i++) {
    const fx = Math.random() * width;
    const fy = Math.random() * height;
    const rad = 25 + Math.random() * 50;
    const grad = ctx.createRadialGradient(fx, fy, 2, fx, fy, rad);
    grad.addColorStop(0, 'rgba(255, 245, 180, 0.45)');
    grad.addColorStop(0.4, 'rgba(255, 160, 40, 0.25)');
    grad.addColorStop(1, 'rgba(255, 80, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(fx, fy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('sun', texture);
  return texture;
}

/**
 * Generate Mercury Texture (Rocky, heavily cratered)
 */
export function getMercuryTexture() {
  if (textureCache.has('mercury')) return textureCache.get('mercury');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const n = fbm(nx * 18, ny * 18, 6, 12);
      const tone = Math.floor(100 + n * 95);

      // Mercury basaltic ochre tint
      data[idx] = Math.min(255, tone + 10);
      data[idx + 1] = tone;
      data[idx + 2] = Math.max(0, tone - 15);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add impact craters
  for (let i = 0; i < 45; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = 4 + Math.random() * 18;

    const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr);
    grad.addColorStop(0, 'rgba(50, 45, 40, 0.7)');
    grad.addColorStop(0.7, 'rgba(70, 65, 60, 0.4)');
    grad.addColorStop(0.9, 'rgba(180, 175, 165, 0.6)'); // bright crater rim
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('mercury', texture);
  return texture;
}

/**
 * Generate Venus Texture (Thick yellowish-amber atmospheric clouds)
 */
export function getVenusTexture() {
  if (textureCache.has('venus')) return textureCache.get('venus');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      // Heavy horizontal cloud shear
      const cloud = fbm(nx * 10 + ny * 2, ny * 24, 5, 77);
      const band = Math.sin(ny * Math.PI * 12 + cloud * 3) * 0.15;

      const v = Math.min(1, Math.max(0, cloud + band));
      data[idx] = Math.floor(215 + v * 35);
      data[idx + 1] = Math.floor(170 + v * 55);
      data[idx + 2] = Math.floor(110 + v * 50);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('venus', texture);
  return texture;
}

/**
 * Generate Earth Surface Texture (Continents, deep blue oceans, polar ice)
 */
export function getEarthTexture() {
  if (textureCache.has('earth')) return textureCache.get('earth');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const isPolar = ny < 0.12 || ny > 0.88;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      if (isPolar) {
        // Polar ice caps
        const ice = fbm(nx * 12, ny * 12, 4, 301);
        data[idx] = Math.floor(220 + ice * 35);
        data[idx + 1] = Math.floor(235 + ice * 20);
        data[idx + 2] = 255;
        data[idx + 3] = 255;
        continue;
      }

      // Continental noise
      const continent = fbm(nx * 6, ny * 6, 6, 404);

      if (continent > 0.52) {
        // Land (Green, brown, savanna)
        const veg = fbm(nx * 16, ny * 16, 4, 88);
        if (veg > 0.58) {
          // Lush forest green
          data[idx] = 40;
          data[idx + 1] = 130 + Math.floor(veg * 45);
          data[idx + 2] = 50;
        } else {
          // Mountain / savanna brown
          data[idx] = 145 + Math.floor(veg * 40);
          data[idx + 1] = 125 + Math.floor(veg * 30);
          data[idx + 2] = 75;
        }
      } else {
        // Ocean (Deep blue with shallow azure shelves near coasts)
        const depth = continent / 0.52;
        data[idx] = Math.floor(10 + depth * 25);
        data[idx + 1] = Math.floor(45 + depth * 65);
        data[idx + 2] = Math.floor(125 + depth * 115);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('earth', texture);
  return texture;
}

/**
 * Generate Earth Cloud Texture (Translucent swirling weather patterns)
 */
export function getEarthCloudTexture() {
  if (textureCache.has('earth-clouds')) return textureCache.get('earth-clouds');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const clouds = fbm(nx * 8 + ny * 2, ny * 8, 5, 888);
      const alpha = clouds > 0.52 ? Math.min(255, Math.floor((clouds - 0.52) * 550)) : 0;

      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = alpha;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('earth-clouds', texture);
  return texture;
}

/**
 * Generate Mars Texture (Rusty red deserts, dark highlands, polar cap)
 */
export function getMarsTexture() {
  if (textureCache.has('mars')) return textureCache.get('mars');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const isPolar = ny < 0.08 || ny > 0.94;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      if (isPolar) {
        data[idx] = 240;
        data[idx + 1] = 230;
        data[idx + 2] = 225;
        data[idx + 3] = 255;
        continue;
      }

      const terrain = fbm(nx * 12, ny * 12, 6, 515);
      const r = Math.floor(180 + terrain * 65);
      const g = Math.floor(65 + terrain * 45);
      const b = Math.floor(35 + terrain * 25);

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('mars', texture);
  return texture;
}

/**
 * Generate Jupiter Texture (Turbulent gas bands, Great Red Spot)
 */
export function getJupiterTexture() {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      // Heavy horizontal jet streams
      const turbulence = fbm(nx * 16, ny * 4, 4, 712) * 0.12;
      const bandFreq = Math.sin((ny + turbulence) * Math.PI * 18);
      const band = (bandFreq + 1) * 0.5;

      // Color interpolation between cream, terracotta, and deep brown
      let r, g, b;
      if (band > 0.6) {
        // Terracotta / orange-brown band
        r = Math.floor(195 + band * 45);
        g = Math.floor(125 + band * 40);
        b = Math.floor(75 + band * 30);
      } else if (band > 0.3) {
        // Pale cream / white zone
        r = Math.floor(225 + band * 30);
        g = Math.floor(205 + band * 30);
        b = Math.floor(175 + band * 35);
      } else {
        // Deep chocolate brown belt
        r = Math.floor(150 + band * 50);
        g = Math.floor(85 + band * 40);
        b = Math.floor(45 + band * 30);
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Draw Great Red Spot
  const grsX = width * 0.62;
  const grsY = height * 0.68;
  const grsRadiusX = 45;
  const grsRadiusY = 24;

  const grsGrad = ctx.createRadialGradient(grsX, grsY, 4, grsX, grsY, grsRadiusX);
  grsGrad.addColorStop(0, '#B33924');
  grsGrad.addColorStop(0.5, '#CC4B31');
  grsGrad.addColorStop(0.85, '#D97A52');
  grsGrad.addColorStop(1, 'rgba(217, 122, 82, 0)');

  ctx.fillStyle = grsGrad;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRadiusX, grsRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('jupiter', texture);
  return texture;
}

/**
 * Generate Saturn Surface Texture (Subtle gold-butterscotch bands)
 */
export function getSaturnTexture() {
  if (textureCache.has('saturn')) return textureCache.get('saturn');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const n = fbm(nx * 8, ny * 2, 3, 219) * 0.05;
      const band = Math.sin((ny + n) * Math.PI * 24) * 0.5 + 0.5;

      const r = Math.floor(215 + band * 35);
      const g = Math.floor(185 + band * 40);
      const b = Math.floor(130 + band * 45);

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('saturn', texture);
  return texture;
}

/**
 * Generate Saturn Ring Texture with Cassini Division
 */
export function getSaturnRingTexture() {
  if (textureCache.has('saturn-ring')) return textureCache.get('saturn-ring');

  const width = 512;
  const height = 32;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, width, 0);
  // Inner ring C (faint)
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.12, 'rgba(165, 140, 100, 0.25)');
  grad.addColorStop(0.25, 'rgba(215, 185, 135, 0.6)');
  // B ring (brightest & densest)
  grad.addColorStop(0.35, 'rgba(240, 215, 160, 0.85)');
  grad.addColorStop(0.58, 'rgba(235, 205, 145, 0.9)');
  // Cassini Division (dark gap)
  grad.addColorStop(0.60, 'rgba(15, 10, 5, 0.05)');
  grad.addColorStop(0.66, 'rgba(15, 10, 5, 0.05)');
  // A ring
  grad.addColorStop(0.68, 'rgba(210, 180, 135, 0.7)');
  grad.addColorStop(0.88, 'rgba(195, 165, 120, 0.55)');
  grad.addColorStop(0.95, 'rgba(170, 140, 100, 0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn-ring', texture);
  return texture;
}

/**
 * Generate Uranus Texture (Cyan aquamarine ice haze)
 */
export function getUranusTexture() {
  if (textureCache.has('uranus')) return textureCache.get('uranus');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const haze = fbm(nx * 6, ny * 6, 3, 333);
      const r = Math.floor(80 + haze * 25);
      const g = Math.floor(205 + haze * 35);
      const b = Math.floor(215 + haze * 40);

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('uranus', texture);
  return texture;
}

/**
 * Generate Neptune Texture (Deep azure blue with storm bands)
 */
export function getNeptuneTexture() {
  if (textureCache.has('neptune')) return textureCache.get('neptune');

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const storm = fbm(nx * 14 + ny * 2, ny * 10, 4, 919);
      const r = Math.floor(30 + storm * 30);
      const g = Math.floor(70 + storm * 50);
      const b = Math.floor(190 + storm * 65);

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Add white high-altitude methane storm streak
  ctx.fillStyle = 'rgba(230, 245, 255, 0.45)';
  ctx.beginPath();
  ctx.ellipse(width * 0.45, height * 0.42, 35, 7, -0.15, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('neptune', texture);
  return texture;
}



/**
 * Generate Lunar Texture (Earth's Moon / cratered satellite)
 */
export function getMoonTexture() {
  if (textureCache.has('moon')) return textureCache.get('moon');

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm(nx * 14, ny * 14, 5, 201);
      const n2 = fbm(nx * 28, ny * 28, 4, 305);
      const val = n1 * 0.7 + n2 * 0.3;

      const tone = Math.floor(130 + val * 90);
      data[idx] = tone;
      data[idx + 1] = tone;
      data[idx + 2] = tone + 5;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add impact craters
  for (let i = 0; i < 35; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = 3 + Math.random() * 12;

    const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr);
    grad.addColorStop(0, 'rgba(40, 40, 45, 0.7)');
    grad.addColorStop(0.7, 'rgba(75, 75, 80, 0.4)');
    grad.addColorStop(0.9, 'rgba(195, 195, 205, 0.7)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('moon', texture);
  return texture;
}

/**
 * Generate Icy Moon Texture (Europa / Enceladus)
 */
export function getIcyMoonTexture() {
  if (textureCache.has('icy-moon')) return textureCache.get('icy-moon');

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const ice = fbm(nx * 10, ny * 10, 4, 719);
      data[idx] = Math.floor(210 + ice * 40);
      data[idx + 1] = Math.floor(225 + ice * 30);
      data[idx + 2] = Math.floor(240 + ice * 15);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add ice fracture lines (lineae)
  ctx.strokeStyle = 'rgba(160, 95, 60, 0.45)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    let sx = Math.random() * width;
    let sy = Math.random() * height;
    ctx.moveTo(sx, sy);
    for (let j = 0; j < 4; j++) {
      sx += (Math.random() - 0.5) * 80;
      sy += (Math.random() - 0.5) * 50;
      ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('icy-moon', texture);
  return texture;
}

/**
 * Generate Distant Spiral Galaxy Billboard Texture
 */
export function getSpiralGalaxyTexture() {
  if (textureCache.has('spiral-galaxy')) return textureCache.get('spiral-galaxy');

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  // Clear transparent
  ctx.clearRect(0, 0, size, size);

  // Generate spiral arms with 12,000 particle stars
  const arms = 2;
  const armTightness = 2.8;
  const maxRadius = size * 0.44;

  for (let i = 0; i < 14000; i++) {
    const armIndex = i % arms;
    const armOffset = (armIndex * 2 * Math.PI) / arms;
    const dist = Math.pow(Math.random(), 1.6) * maxRadius;
    const angle = dist * (armTightness / maxRadius) * Math.PI * 2 + armOffset + (Math.random() - 0.5) * 0.65;

    const x = center + Math.cos(angle) * dist;
    const y = center + Math.sin(angle) * dist;

    const distFromCenter = dist / maxRadius;
    const alpha = Math.max(0, 1 - distFromCenter) * (0.35 + Math.random() * 0.65);

    // Color: warm yellowish core fading into electric blue & purple outer arms
    let r, g, b;
    if (distFromCenter < 0.22) {
      r = 255;
      g = 235;
      b = 180;
    } else if (distFromCenter < 0.65) {
      r = 160 + Math.floor(Math.random() * 50);
      g = 190 + Math.floor(Math.random() * 60);
      b = 255;
    } else {
      r = 130 + Math.floor(Math.random() * 50);
      g = 140 + Math.floor(Math.random() * 50);
      b = 245;
    }

    const starSize = Math.random() < 0.05 ? 2.2 : 0.9;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Intense glowing galactic core
  const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, size * 0.16);
  coreGrad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
  coreGrad.addColorStop(0.2, 'rgba(255, 225, 160, 0.65)');
  coreGrad.addColorStop(0.5, 'rgba(180, 170, 240, 0.25)');
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(center, center, size * 0.16, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('spiral-galaxy', texture);
  return texture;
}

/**
 * Generate Asteroid Surface Texture
 */
export function getAsteroidTexture() {
  if (textureCache.has('asteroid')) return textureCache.get('asteroid');

  const width = 256;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const rock = fbm(nx * 12, ny * 12, 4, 88);
      const tone = Math.floor(70 + rock * 75);

      data[idx] = tone + 10;
      data[idx + 1] = tone;
      data[idx + 2] = Math.max(0, tone - 10);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('asteroid', texture);
  return texture;
}


/**
 * Generate Circular Glowing Star Sprite Texture
 * 100% round with safe transparent border padding.
 * Prevents WebGL from rendering stars as square boxes/pixels.
 */
export function getStarSpriteTexture() {
  if (textureCache.has('star-sprite')) return textureCache.get('star-sprite');

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;
  // Radius strictly smaller than half-width to prevent touching square canvas edges
  const radius = size * 0.44;

  ctx.clearRect(0, 0, size, size);

  // Soft spherical Gaussian starlight gradient
  const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.12, 'rgba(250, 252, 255, 0.95)');
  grad.addColorStop(0.28, 'rgba(200, 230, 255, 0.65)');
  grad.addColorStop(0.55, 'rgba(130, 185, 255, 0.25)');
  grad.addColorStop(0.82, 'rgba(80, 140, 255, 0.05)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  textureCache.set('star-sprite', texture);
  return texture;
}

/**
 * Generate 4-Point Starlight Diffraction Flare Texture (Hubble / JWST Style)
 * Produces cinematic circular starlight with delicate cross spikes.
 */
export function getStarFlareTexture() {
  if (textureCache.has('star-flare')) return textureCache.get('star-flare');

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  ctx.clearRect(0, 0, size, size);

  // 1. Central Core Glow
  const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, size * 0.42);
  coreGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  coreGrad.addColorStop(0.15, 'rgba(235, 245, 255, 0.8)');
  coreGrad.addColorStop(0.4, 'rgba(140, 200, 255, 0.3)');
  coreGrad.addColorStop(0.8, 'rgba(70, 130, 255, 0.04)');
  coreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(center, center, size * 0.42, 0, Math.PI * 2);
  ctx.fill();

  // 2. Horizontal & Vertical Subtle Diffraction Spikes
  const drawSpike = (isVertical) => {
    const spikeGrad = isVertical
      ? ctx.createLinearGradient(0, 0, 0, size)
      : ctx.createLinearGradient(0, 0, size, 0);
    spikeGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
    spikeGrad.addColorStop(0.4, 'rgba(180, 220, 255, 0.25)');
    spikeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    spikeGrad.addColorStop(0.6, 'rgba(180, 220, 255, 0.25)');
    spikeGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = spikeGrad;
    if (isVertical) {
      ctx.fillRect(center - 1.2, 8, 2.4, size - 16);
    } else {
      ctx.fillRect(8, center - 1.2, size - 16, 2.4);
    }
  };

  drawSpike(false);
  drawSpike(true);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  textureCache.set('star-flare', texture);
  return texture;
}

/**
 * Generate Saturn's Moon Titan Texture (Dense Golden-Amber Nitrogen Atmosphere)
 */
export function getTitanTexture() {
  if (textureCache.has('titan-moon')) return textureCache.get('titan-moon');

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      // Atmospheric haze banding
      const haze = fbm(nx * 8, ny * 8, 4, 882);
      const band = Math.sin(ny * Math.PI * 6 + haze * 1.5) * 0.12;

      const r = Math.floor(215 + haze * 30 + band * 20);
      const g = Math.floor(145 + haze * 25 + band * 15);
      const b = Math.floor(65 + haze * 20 + band * 10);

      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.max(0, b);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('titan-moon', texture);
  return texture;
}

/**
 * Generate Jupiter's Moon Callisto Texture (Ancient Multi-Cratered Ice/Rock World)
 */
export function getCallistoTexture() {
  if (textureCache.has('callisto-moon')) return textureCache.get('callisto-moon');

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const rock = fbm(nx * 14, ny * 14, 5, 411);
      const tone = Math.floor(75 + rock * 80);

      data[idx] = tone;
      data[idx + 1] = tone + 2;
      data[idx + 2] = tone + 6;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Hundreds of sparkling ancient ice impact craters (Valhalla & Asgard style)
  for (let i = 0; i < 90; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = 2 + Math.random() * 8;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    grad.addColorStop(0, 'rgba(235, 245, 255, 0.9)');
    grad.addColorStop(0.4, 'rgba(180, 205, 230, 0.6)');
    grad.addColorStop(0.8, 'rgba(40, 45, 50, 0.7)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('callisto-moon', texture);
  return texture;
}

/**
 * Generate Jupiter's Moon Io Texture (Sulfuric Volcanic World)
 */
export function getIoTexture() {
  if (textureCache.has('io-moon')) return textureCache.get('io-moon');

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const sulfur = fbm(nx * 10, ny * 10, 4, 523);
      const r = Math.floor(215 + sulfur * 35);
      const g = Math.floor(180 + sulfur * 40);
      const b = Math.floor(40 + sulfur * 60);

      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Volcanic calderas (Pele, Loki Patera)
  for (let i = 0; i < 25; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = 4 + Math.random() * 14;

    const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr);
    grad.addColorStop(0, 'rgba(30, 20, 15, 0.95)'); // Black volcanic pit
    grad.addColorStop(0.35, 'rgba(180, 50, 15, 0.85)'); // Red-orange sulfur ring
    grad.addColorStop(0.7, 'rgba(240, 150, 20, 0.5)'); // Yellow halo
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('io-moon', texture);
  return texture;
}

/**
 * Generate Soft Radial Circular Nebula Cloud Texture
 * 100% spherical falloff - guarantees zero square edges or polygon boundaries.
 */
export function getRadialNebulaTexture(baseColor = '#8155C7') {
  const cacheKey = `radial-nebula-${baseColor}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  ctx.clearRect(0, 0, size, size);

  // Parse color to RGB
  const c = new THREE.Color(baseColor);
  const r = Math.floor(c.r * 255);
  const g = Math.floor(c.g * 255);
  const b = Math.floor(c.b * 255);

  const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.85)`);
  grad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, 0.55)`);
  grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, 0.22)`);
  grad.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, 0.04)`);
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}
