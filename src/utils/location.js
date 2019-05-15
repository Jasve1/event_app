
function getLocation(){
    return new Promise((res, rej) => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function findRange(position) {
                let range = 0.04;
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                let minLat = lat - range;
                let maxLat = lat + range;
                let minLong = long - range;
                let maxLong = long + range;
            
            
                let positionObject = {
                    range: range,
                    minLat: minLat,
                    maxLat: maxLat,
                    minLong: minLong,
                    maxLong: maxLong
                  }
                
                res(positionObject);
            }
        )
      }
      else{
        console.log('Geolocation is not supported');
        res(null);
      }
    });
  }

function filterByPosition(events, position) {
  let filteredEvents = events.filter(event => 
    event.location[0] >= position.minLat && event.location[0] <= position.maxLat
    && event.location[1] >= position.minLong && event.location[1] <= position.maxLong
  )
  return filteredEvents
  }

module.exports = {getLocation, filterByPosition}