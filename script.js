mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnJuYyIsImEiOiJjbW8xc3FnbmgwbTJwMnBwbjI2Mnc0MnJ3In0.CMaQPgQ3G_m2EG6w2Dp9PA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ryanrnc/cmo1uhqhn001z01s57t67e55w',
  center: [-80.5204, 43.4643],
  zoom: 15
});

// Setup Toggles
function setupToggle(btnId, panelId) {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  const originalText = btn.textContent;

  btn.onclick = () => {
    panel.classList.toggle('open');
    btn.textContent = panel.classList.contains('open') ? 'Close' : originalText;
  };
}

setupToggle('info-toggle', 'info-panel');
setupToggle('legend-toggle', 'legend-panel');

map.on('load', () => {
  const layers = map.getStyle().layers;
  const legendItems = document.getElementById('legend-items');

  layers.forEach((layer) => {
    if (layer.type !== 'background' && layer.layout?.visibility !== 'none') {
      const item = document.createElement('div');
      item.className = 'legend-item';

      const key = document.createElement('span');
      key.className = 'legend-key';
      
      let color = '#ccc'; 
      if (layer.paint) {
        color = layer.paint['fill-color'] || 
                layer.paint['line-color'] || 
                layer.paint['circle-color'] || 
                layer.paint['text-color'] || '#ccc';
      }

      key.style.backgroundColor = Array.isArray(color) ? '#3887be' : color;
      const value = document.createElement('span');
      value.innerHTML = `${layer.id.replace(/-/g, ' ')}`; 

      item.appendChild(key);
      item.appendChild(value);
      legendItems.appendChild(item);
    }
  });
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');