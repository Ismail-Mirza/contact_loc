
function haversine_distance(mk1, mk2) {
      var R = 6371.0710; // Radius of the Earth in miles
      var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d.toFixed(2);
    }
// Define an array of material design colors
// Define a base color in hex code format
// Define an array of material design colors
const materialColors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B',
  '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C',
  '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#5D4037', '#616161', '#455A64',
  '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59',
  '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40', '#6D4C41', '#424242', '#78909C',
  '#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#283593', '#1565C0', '#0277BD', '#00838F', '#00695C', '#2E7D32',
  '#558B2F', '#9E9D24', '#F9A825', '#FF8F00', '#EF6C00', '#D84315', '#4E342E', '#424242', '#37474F',
  '#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20',
  '#33691E', '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C', '#3E2723', '#212121', '#263238'
];
var locations = [
            ['Bondi Beach', -33.890542, 151.274856, 4],
            ['Coogee Beach', -33.923036, 151.259052, 5],
            ['Cronulla Beach', -34.028249, 151.157507, 3],
            ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            ['Maroubra Beach', -33.950198, 151.259302, 1]
            ];
            let sum_lat = 0,sum_long= 0;
            locations.map((location)=>{
                sum_lat += location[1];
                sum_long += location[2];
            })
            let length_place = locations.length;
            let place = document.querySelector(".place-name");
            place.innerHTML = `<h1>${locations[0][0]}</h1>`
            

    async function init_map(){
            const {
                AdvancedMarkerView,PinView
            } = await google.maps.importLibrary("marker");
            const {
        Map
    } = await google.maps.importLibrary("maps");
            let base_position= new google.maps.LatLng(sum_lat/length_place,sum_long/length_place);
            
            var map = new Map(document.getElementById('map'), {
            zoom: 10,
            center: base_position,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapId: "DEMO_MAP_ID",
            });
            let base_marker = new AdvancedMarkerView({
                map:map,
                position: base_position,
                content: new PinView({
                    scale: 1.5
                }).element
                
            });
            var infowindow = new google.maps.InfoWindow();

            var marker, i;
            
            for (i = 0; i < locations.length; i++) { 
            const baseColor = materialColors[Math.floor(Math.random() * materialColors.length)];

            // Calculate the light and dark shades of the base color
            const lightShade = tinycolor(baseColor).lighten(30).toHexString();
            const darkShade = tinycolor(baseColor).darken(30).toHexString();
             
            const pinViewStyle = new PinView({
                                        scale: 1.5,
                                        background: baseColor,
                                        borderColor: darkShade,
                                        glyphColor: lightShade,
                                });
            let other_position = new google.maps.LatLng(locations[i][1], locations[i][2]);
            marker = new AdvancedMarkerView({
                map:map,
                position: other_position,
                content:pinViewStyle.element
            });

            
            let content_div =  document.querySelector(".content");
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                        content = `<div class="circle">
            <i class="fa-solid fa-location-dot"></i>
        </div>
        <span>Lorem ipsum dolor sit</span>
        <div class="distance">
            <div>
                <i class="fa-regular fa-map" style="color:gray;"></i>
            <span style="padding-left:5px;">Hace instanlcs</span>
            </div>
            <div>
                ${haversine_distance(base_marker,marker)} km
            </div>
        </div>
        <div class="circle-subsidio">
            <div class="repeat">
                <i class="fa-solid fa-repeat"></i>
            </div>
            <div class="title">
                Subsidio
            </div>
        </div>
        <div class="services">
            <div class="service-title">
                    <div>

                    <span>Estada de la Estacion de Servicio</span>
                    </div>
                    <div style="font-size: 30px;display:flex;justify-self:center;align-self:center;color:gray;cursor:pointer;">
                        ...
                    </div>
            </div>
            <div class="service">
                    <div>

                    <i class="fa-regular fa-clock"></i>
                    </div>
                    <div class="rounded green">
                            Abierta
                    </div>
            </div>
            <hr>
            <div class="service">
                    <div>

                    <i class="fa-solid fa-truck-front"></i>
                    </div>
                    <div class="rounded gray">
                        Cola Moderada
                    </div>
            </div>
            <div class="service">
                    <div>

                    <i class="fa-solid fa-gas-pump"></i>
                    </div>
                    <div class="rounded green">
                        Tiena Combustible
                    </div>
            </div>
        </div>`
                        place.innerHTML = `<h1>${locations[i][0]}</h1>`;
                        content_div.classList.add("show");
                        content_div.innerHTML = content;
                }   
            })(marker, i));
            }
    }
    init_map();