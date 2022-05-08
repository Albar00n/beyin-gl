import{ APIFormat} from "@here/harp-vectortile-datasource";
import { VectorTileDataSource, GeoJsonDataProvider } from "@here/harp-vectortile-datasource";
import { Theme } from "@here/harp-datasource-protocol";
import { MapViewEventNames } from "@here/harp-mapview";
import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";
// import { GUI } from "dat.gui";

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
}

getWirelessHotspots();
// async function addRailRoads() {
//     const globalRailroads = new VectorTileDataSource({
//        baseUrl: "https://xyz.api.here.com/hub/spaces/hUJ4ZHJR/tile/web",
//        apiFormat: APIFormat.XYZSpace,
//        authenticationCode: 'ACbs-cqcFI4FlPRLK_VF1co', //Use this token!
//        styleSetName: "geojson"
//     });

//     await mapView.addDataSource(globalRailroads);
//     const theme = {
//       styles: {
//         geojson: [
//           {
//             when: ["==", ["geometry-type"], "LineString"],
//             renderOrder: 1000,
//             technique: "solid-line",
//             color: "#D73060",
//             opacity: 1,
//             metricUnit: "Pixel",
//             lineWidth: 1,
//           },
//         ],
//       },
//     };
//     globalRailroads.setTheme(theme);
//     mapView.update();
//  }
//  addRailRoads();


//  const gui = new GUI({ width: 300 });
//  const options = {
//      theme: {
//          day: "resources/berlin_tilezen_base.json",
//          reducedDay: "resources/berlin_tilezen_day_reduced.json",
//          reducedNight: "resources/berlin_tilezen_night_reduced.json",
//          streets: "resources/berlin_tilezen_effects_streets.json",
//          outlines: "resources/berlin_tilezen_effects_outlines.json"
//      }
//  };
//  gui.add(options, "theme", options.theme)
//      .onChange(async (value) => {
//          await mapView.setTheme(value);
//      })
//      .setValue("resources/theme.json");

