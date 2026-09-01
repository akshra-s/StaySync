import * as maplibregl from "https://unpkg.com/maplibre-gl@6.6.0/dist/maplibre-gl.mjs";

const mapElement = document.getElementById("map");

const coordinates = JSON.parse(mapElement.dataset.coordinates);
const title = mapElement.dataset.title;
const location = mapElement.dataset.location;

const map = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: {
        lng: Number(coordinates[0]),
        lat: Number(coordinates[1])
    },
    zoom: 8
});

const marker = new maplibregl.Marker({ color: "red" })
    .setLngLat({
        lng: Number(coordinates[0]),
        lat: Number(coordinates[1])
    })
    .addTo(map);

marker.setPopup(
    new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h4>${location}</h4><p>Exact Location will be provided after booking</p>`)
);