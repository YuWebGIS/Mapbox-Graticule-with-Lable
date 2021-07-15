// generate lable of longitude
function generateLngLable(map) {
    let mapBound = map.getBounds();
    let mapZoom = map.getZoom();
    // set interval by zoom, same with grid
    let interval = mapZoom > 7 ? 1 : (mapZoom > 6 ? 2 : (mapZoom > 5 ? 5 : (mapZoom > 4 ? 10 : (mapZoom > 3 ? 15 : 30))));
    let lableFeatureList = [];
    for (let i = -180; i < 180; i += interval) {
        let lableName = i.toString() + "°" + (i < 0 && i > -180 ? "W" : (i > 0 ? "E" : ""));
        let lableFeature = {
            "type": "Feature",
            "properties": {
                "Name": lableName
            },
            "geometry": {
                "type": "Point",
                "coordinates": [i, map.getBounds()._sw.lat]
            }
        };
        lableFeatureList.push(lableFeature);
    }
    let lableSource = {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "name": "lngLable",
            "features": lableFeatureList
        }
    };
    return lableSource;
}

// generate lable of latitude
function generateLatLable(map) {
    let mapBound = map.getBounds();
    if (Math.abs(mapBound._ne.lng - mapBound._sw.lng) > 360) {
        let lableSource = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "name": "latLable",
                "features": []
            }
        };
        return lableSource;
    }
    let mapZoom = map.getZoom();
    let interval = mapZoom > 7 ? 1 : (mapZoom > 6 ? 2 : (mapZoom > 5 ? 5 : (mapZoom > 4 ? 10 : (mapZoom > 3 ? 15 : 30))));
    let lableFeatureList = [];
    for (let i = -90; i < 90; i += interval) {
        if (i < -85 || i > 85) continue;
        let lableName = i.toString() + "°" + (i < 0 ? "S" : (i > 0 ? "N" : ""));
        let lableFeature = {
            "type": "Feature",
            "properties": {
                "Name": lableName
            },
            "geometry": {
                "type": "Point",
                "coordinates": [map.getBounds()._ne.lng, i]
            }
        };
        lableFeatureList.push(lableFeature);
    }
    let lableSource = {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "name": "latLable",
            "features": lableFeatureList
        }
    };
    return lableSource;
}

// add lable
function generateMapLable(map) {
    let lngLableSource = generateLngLable(map);
    let latLableSource = generateLatLable(map);

    map.addSource('lngLable', lngLableSource);
    map.addSource('latLable', latLableSource);

    map.addLayer({
        "id": "bottomLable",
        "type": "symbol",
        "source": "lngLable",
        "layout": {
            "visibility": "visible",
            "text-field": ["get", "Name"],
            "text-variable-anchor": ["bottom"],
            "text-radial-offset": 0.5,
            "text-justify": "auto",
            "text-size": 16,
            "text-font": ["Arial Unicode MS Regular"]
        },
        "paint": {
            "text-color": "black",
            "text-halo-width": 2,
            "text-halo-color": "white"
        }
    });
    map.addLayer({
        "id": "rightLable",
        "type": "symbol",
        "source": "latLable",
        "layout": {
            "visibility": "visible",
            "text-field": ["get", "Name"],
            "text-variable-anchor": ["right"],
            "text-radial-offset": 0.5,
            "text-justify": "auto",
            "text-size": 16,
            "text-font": ["Arial Unicode MS Regular"]
        },
        "paint": {
            "text-color": "black",
            "text-halo-width": 2,
            "text-halo-color": "white"
        }
    });
}

function addMapLable(map) {
    removeMapLable(map);
    generateMapLable(map);
}

function removeMapLable(map) {
    if (map.getLayer('bottomLable')) {
        map.removeLayer('bottomLable');
        map.removeSource('lngLable');
    }
    if (map.getLayer('rightLable')) {
        map.removeLayer('rightLable');
        map.removeSource('latLable');
    }
}