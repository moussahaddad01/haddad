var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM({
  }),
  name:'open street Map'

   // Utiliser la source OSM pour la couche
});

var satelliteLayer = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', // Exemple avec une source d'imagerie satellite ArcGIS
    crossOrigin: 'anonymous',
  }),
  name:'image satellite'
});

// Créer une carte OpenLayers avec la couche OSM
var map = new ol.Map({
  target: 'map',
  layers: [osmLayer,satelliteLayer], // Ajouter la couche à la carte
  view: new ol.View({
    center: ol.proj.fromLonLat([-0.432391,35.8542685]), // Coordonnées initiales (longitude, latitude)
    zoom: 11// Niveau de zoom initial
  })
});
var layerSwitcher = new ol.control.LayerSwitcher({
  activationMode:'click',
  startActive: false,
  groupSelectStyle:'children'
  });

map.addControl(layerSwitcher);

const fichier=document.getElementsByClassName('input')
console.log(fichier[0])
fichier[0].addEventListener("change", () => {
    const file = fichier[0].files[0]
      fetch(file.name)
        .then((res) => {
            var vectorLayerJSON = new ol.layer.Vector({
                source: new ol.source.Vector({
                  format: new ol.format.GeoJSON(),
                  url: res.url
                }),
                name:file.name,
                style: new ol.style.Style({
                  image: new ol.style.Circle(({
                    radius: 3,
                    fill: new ol.style.Fill({
                      color: '#ffff00'
                    })
                  }))
                })
              });
              map.addLayer(vectorLayerJSON);
            })
        .then((data) => console.log(data))


        
  });
 