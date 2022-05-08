
import { MapControls } from "@here/harp-map-controls";
import { MapView } from "@here/harp-mapview";
import { VectorTileDataSource } from "@here/harp-vectortile-datasource";

const defaultTheme = "resources/street.json";

export class View {
    constructor(args) {
        this.canvas = args.canvas;
        this.theme = args.theme === undefined ? defaultTheme : args.theme;
        this.mapView = this.initialize();
    }

    initialize() {
        const mapView = new MapView({
            canvas: this.canvas,
            theme: this.theme,
            decoderUrl: "decoder.bundle.js",
        });
        const dataSource = new VectorTileDataSource({
            authenticationCode: "nkUx7_cDkChlAXpIlSdaBeZxvUyHHIwSHg2F1CPDpWk"
        });
        mapView.addDataSource(dataSource);
        MapControls.create(mapView);
        return mapView;
    }
}
