function haversine_distance(mk1, mk2) {
 console.log(mk1.position)
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = mk1.position.h * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.position.h * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.j - mk1.position.j) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d.toFixed(2);
}

// Define an array of material design colors
// Define a base color in hex code format
// Define an array of material design colors
const materialColors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
  "#D32F2F",
  "#C2185B",
  "#7B1FA2",
  "#512DA8",
  "#303F9F",
  "#1976D2",
  "#0288D1",
  "#0097A7",
  "#00796B",
  "#388E3C",
  "#689F38",
  "#AFB42B",
  "#FBC02D",
  "#FFA000",
  "#F57C00",
  "#E64A19",
  "#5D4037",
  "#616161",
  "#455A64",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#B2FF59",
  "#EEFF41",
  "#FFFF00",
  "#FFD740",
  "#FFAB40",
  "#FF6E40",
  "#6D4C41",
  "#424242",
  "#78909C",
  "#C62828",
  "#AD1457",
  "#6A1B9A",
  "#4527A0",
  "#283593",
  "#1565C0",
  "#0277BD",
  "#00838F",
  "#00695C",
  "#2E7D32",
  "#558B2F",
  "#9E9D24",
  "#F9A825",
  "#FF8F00",
  "#EF6C00",
  "#D84315",
  "#4E342E",
  "#424242",
  "#37474F",
  "#B71C1C",
  "#880E4F",
  "#4A148C",
  "#311B92",
  "#1A237E",
  "#0D47A1",
  "#01579B",
  "#006064",
  "#004D40",
  "#1B5E20",
  "#33691E",
  "#827717",
  "#F57F17",
  "#FF6F00",
  "#E65100",
  "#BF360C",
  "#3E2723",
  "#212121",
  "#263238",
];
//load from api
var locations = [
  ["Sambil Caracas", 10.4917, -66.8567],
  ["Chuao", 10.4801129, -66.8565273],
  ["Líder", 10.4883, -66.8449],
  ["Tolón Fashion Mall", 10.4917, -66.8537],
  ["Centro Comercial El Recreo", 10.5058, -66.8602],
];
var base_location = ["Caracas", 10.49, -66.85]; //load from api

function avg(locations) {
  var sum1 = 0;
  var sum2 = 0;

  for (var i = 0; i < locations.length; i++) {
    sum1 += locations[i][1]; // add the latitude (second item) of each nested array to the sum
    sum2 += locations[i][2];
  }
  // console.log()
  return [sum1 / locations.length, sum2 / locations.length];
}
let [avg_lat, avg_lng] = avg(locations);

let base_lat = base_location[1];
let base_lang = base_location[2];
let place = document.querySelector(".place-name");
place.innerHTML = `<h1>${base_location[0]}</h1>`;

async function init_map() {
  const { AdvancedMarkerView, PinView } = await google.maps.importLibrary(
    "marker"
  );
  const { Map } = await google.maps.importLibrary("maps");
  let base_position = new google.maps.LatLng(base_lat, base_lang);
  // Define the media query for mobile devices
  var mobileQuery = window.matchMedia("(max-width: 767px)");

  // Add a listener to the media query
  mobileQuery.addListener(handleMobileChange);
  let zoom;
  // Define a function to handle the media query changes
  function handleMobileChange(mobileQuery) {
    if (mobileQuery.matches) {
      // The viewport is less than or equal to 767 pixels wide (mobile device)
      zoom = 15;
      scale = 2;

      // Add your mobile-specific code here
    } else {
      // The viewport is greater than 767 pixels wide (not a mobile device)
      console.log("Not a mobile device.");
      zoom = 14;
      scale = 1.5;
      // Add your non-mobile-specific code here
    }
  }

  // Call the handleMobileChange function initially to check the media query status
  handleMobileChange(mobileQuery);
  var map = new Map(document.getElementById("map"), {
    zoom: zoom,
    center: new google.maps.LatLng(avg_lat, avg_lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapId: "DEMO_MAP_ID",
  });
  let base_marker = new AdvancedMarkerView({
    map:map,
    position: base_position,
    content: new PinView({
      scale: scale,
    }).element,
  });
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  const baseColor =
    materialColors[Math.floor(Math.random() * materialColors.length)];

  // Calculate the light and dark shades of the base color
  const lightShade = tinycolor(baseColor).lighten(30).toHexString();
  const darkShade = tinycolor(baseColor).darken(30).toHexString();

  for (i = 0; i < locations.length; i++) {
    

    const pinViewStyle = new PinView({
      scale: scale,
      background: baseColor,
      borderColor: darkShade,
      glyphColor: lightShade,
    });
    let other_position = new google.maps.LatLng(
      locations[i][1],
      locations[i][2]
    );
    marker = new AdvancedMarkerView({
      map: map,
      position: other_position,
      content: pinViewStyle.element,
    });

    let content_div = document.querySelector(".content");
    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          content = `<div class="circle">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <span>Lorem ipsum dolor sit</span>
          <div class="distance">
            <div>
              <i class="fa-regular fa-map" style="color: gray"></i>
              <span style="padding-left: 5px">Hace instanlcs</span>
            </div>
            <div>${haversine_distance(base_marker, marker)} km</div>
          </div>
          <div class="circle-subsidio">
            <div class="repeat">
              <i class="fa-solid fa-repeat"></i>
            </div>
            <div class="title">Subsidio</div>
          </div>
          <div class="services">
            <div class="service-title">
              <div>
                <span>Estada de la Estacion de Servicio</span>
              </div>
              <div
                style="
                  font-size: 30px;
                  display: flex;
                  justify-self: center;
                  align-self: center;
                  color: gray;
                  cursor: pointer;
                "
              >
                ...
              </div>
            </div>
            <div class="service">
              <div>
                <i class="fa-regular fa-clock"></i>
              </div>
              <div class="rounded blue">Abierta</div>
            </div>
            <hr />
            <div class="service">
              <div>
                <i class="fa-solid fa-truck-front"></i>
              </div>
              <div class="rounded gray">Cola Moderada</div>
            </div>
            <div class="service">
              <div>
                <i class="fa-solid fa-gas-pump"></i>
              </div>
              <div class="rounded blue">Tiena Combustible</div>
            </div>
          </div>`;
          place.innerHTML = `<h1>${locations[i][0]}</h1>`;
          content_div.classList.add("show");
          content_div.innerHTML = content;
        };
      })(marker, i)
    );
    google.maps.event.addListener(map, 'click', function () {
          content_div.classList.remove("show");

    });

  }
}
init_map();
