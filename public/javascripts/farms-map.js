let mapInstance

function initApp() {
    drawMap()
    getFarmsFromAPI()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#farmsMap'),
        { center: { lat: 40.392499, lng: -3.698214 }, zoom: 10, styles: mapStyles.avocado }
    )
}


function getFarmsFromAPI() {

    axios
        .get('/api/farms')
        .then(response => {
            console.log(response.data)
            drawMarkers(response.data)
        })
        .catch(err => next(new Error(err)))
}


function drawMarkers(farms) {

    farms.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.farmname,
            icon: "https://img.icons8.com/officexs/2x/farm.png",
            
        })
    })

}