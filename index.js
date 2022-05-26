
import { VectorTileDataSource, GeoJsonDataProvider } from "@here/harp-vectortile-datasource";
import { Theme } from "@here/harp-datasource-protocol";
import { MapViewEventNames } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";
import { GUI } from "dat.gui";


const app = new View({
    canvas: document.getElementById("map"),

});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// center the camera to New York
mapView.lookAt({ target: new GeoCoordinates(1.278676, 103.850216),
    zoomLevel: 1,
     tilt: 2
});
// camera
// let heading = 0;
// mapView.addEventListener(MapViewEventNames.Render, () => {
//   mapView.lookAt({ heading });
//   heading += 0.2;
// });
// mapView.beginAnimation();

// At the bottom of the file:


// make sure the map is rendered
mapView.update();

async function getWirelessHotspots() {
    const res = await fetch("resources/wireless-hotspots.geojson");
    const data = await res.json();
    // console.log({data})
    const dataProvider = new GeoJsonDataProvider("wireless-hotspots", data);
    const geoJsonDataSource = new VectorTileDataSource({
      dataProvider,
      name: "wireless-hotspots",
      styleSetName: "geojson",
    });

    await mapView.addDataSource(geoJsonDataSource);
    const theme = {
     styles: {
       geojson: [
         {
           when: ["==", ["geometry-type"], "Point"],
           technique: "circles",
           renderOrder: 1000000,
           color: "#d73060",
           size: 15,
         },
       ],
     },
    };
    geoJsonDataSource.setTheme(theme);
    mapView.lookAt({
       target: new GeoCoordinates(25.197233707483637,55.2743715313594),
       tilt: 65,
       zoomLevel: 16,
    });
    mapView.update();
    const gui = new GUI({ width: 300 });


    const options = {
      theme: {

          reducedDay: "resources/theme.json",
          streets: "resources/street.json",
          berlin:"resources/berlin.json",
          default:"resources/default.json",
          global:"resources/global.json",
          night:"resources/night.json",
          outline:"resources/outline.json",
      }
  };


  gui.add(options, "theme", options.theme)
      .onChange(async (value) => {
          await mapView.setTheme(value);
      })
      .setValue("resources/night.json");
    //   gui.add(options, "tilt", 0, 80, 0.1);
    //   gui.add(options, "zoomLevel", 1, 20, 0.1);
    //   gui.add(options, "globe").onChange(() => {
    //     map.projection = options.globe ? sphereProjection : mercatorProjection;
    // });
    // gui.add(options, "headingSpeed", 0.1, 10, 0.1);
    // const stats = new GUI();
    // stats.dom.style.bottom = "0px";
    // stats.dom.style.top = "";
    // document.body.appendChild(stats.dom);
    // map.addEventListener(MapViewEventNames.Render, () => {
    //     stats.end();
    //     stats.begin();
    // });
}

getWirelessHotspots();
