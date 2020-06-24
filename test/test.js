import FullViewMap from 'facade/fullviewmap';

const map = M.map({ container: 'mapjs', controls: 'layerswitcher' });

const mp = new FullViewMap({
  position: 'TL',
});

map.addPlugin(mp);
