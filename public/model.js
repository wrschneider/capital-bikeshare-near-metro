import stations from './stations'
import $ from 'jquery'

export default class Model {
	constructor() {
		this.metroStationList = stations.sort((a,b) => a.Name.localeCompare(b.Name));
		this.metroStation = {};
		this.nearbyBikeStations = [];
		this.lastUpdate = undefined;
	}

	pickStation(index) {
		this.metroStation = this.metroStationList[index];
		console.log(this.metroStation);
		return this.refresh(); // return promise
	}

	refresh(callback) {
		return $.get('/api', {lat: this.metroStation.Lat, lon: this.metroStation.Lon})
			.then((data) => {
				this.lastUpdate = Date.now();
				this.nearbyBikeStations = data;
			});
	}
}

// var model = new Model();
// model.pickStation(82).then(console.log(model.nearbyBikeStations.map(bikeStation => bikeStation.name + ' ' + bikeStation.nbBikes + ' ' + bikeStation.nbEmptyDocks)));

