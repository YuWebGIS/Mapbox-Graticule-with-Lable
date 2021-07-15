function addMapGrid(map) {
    var grid30 = new MaplibreGrid.Grid({
        gridWidth: 30,
        gridHeight: 30,
        minZoom: 0,
        maxZoom: 3,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid30);

    var grid15 = new MaplibreGrid.Grid({
        gridWidth: 15,
        gridHeight: 15,
        minZoom: 3,
        maxZoom: 4,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid15);

    var grid10 = new MaplibreGrid.Grid({
        gridWidth: 10,
        gridHeight: 10,
        minZoom: 4,
        maxZoom: 5,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid10);

    var grid5 = new MaplibreGrid.Grid({
        gridWidth: 5,
        gridHeight: 5,
        minZoom: 5,
        maxZoom: 6,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid5);

    var grid2 = new MaplibreGrid.Grid({
        gridWidth: 2,
        gridHeight: 2,
        minZoom: 6,
        maxZoom: 7,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid2);

    var grid1 = new MaplibreGrid.Grid({
        gridWidth: 1,
        gridHeight: 1,
        minZoom: 7,
        maxZoom: 18,
        units: 'degrees',
        paint: {
            "line-opacity": 0.7,
            "line-color": "blue",
            "line-width": 1.5
        }
    });
    map.addControl(grid1);

    map.zoomTo(map.getZoom() + 0.001);

    return [grid30, grid15, grid10, grid5, grid2, grid1];
}

function removeMapGrid(map, gridControlList) {
    const numControls = gridControlList.length;
    for (let i = numControls; i > 0; i--) {
        map.removeControl(gridControlList[i - 1]);
    }
}