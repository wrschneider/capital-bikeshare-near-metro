import Model from './model'
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'; 

export default class App extends React.Component {
	model = new Model();
	state = {};

	renderStatus() {
		var dt = new Date(this.state.lastUpdate).toString()
		if (this.state.status == 'OK') {
			return (<div className="alert alert-success">Last update: {dt}</div>)
		} else if (this.state.status == 'FAILURE') {
			return (<div className="alert alert-danger">Error updating: {dt}</div>)
		}
	}

	render() {
		return (
		<div>
			<h2>Capital Bikeshare availability near Metrorail stations</h2>

			<form action="#">
				<select name="metroStation" id="metroStation" onChange={this.selectStation.bind(this)}>
					<option value="">Select station</option>
					{this.model.metroStationList.map((station, i) => 
						<option key={i} value={i}>{station.Name}</option>
					)}
				</select>
			</form>
			{this.renderStatus()}

			{(!this.state.nearbyBikeStations) 
			? <div>...</div>
			: (<div id="results">

				<table className="table table-striped">
					<thead><tr><th>Station</th><th>Bikes</th><th>Docks</th></tr></thead>
					<tbody>
					{this.state.nearbyBikeStations.map(station => 
						<tr><td>{station.name}</td><td>{station.nbBikes}</td><td>{station.nbEmptyDocks}</td></tr>				
					)}
					</tbody>
				</table>
				<button type="button" className="btn btn-primary" onClick={this.refresh}>Refresh</button>
			</div>)
			}
		</div>)
	}

	// use arrow functions to ensure 'this' autobound and avoid need for updateView = updateView.bind(this) etc.
	updateView = () => {
		if (this.model.nearbyBikeStations.status === 'OK') {
			this.setState({
				status: 'OK',
				nearbyBikeStations: this.model.nearbyBikeStations.data,
				lastUpdate: this.model.lastUpdate
			})
		}
	}

	handleFailure = () => {
		this.setState({
			status: 'FAILURE',
			lastUpdate: Date.now()
		})
	}

	selectStation = (event) => {
		var index = event.target.value;
		this.model.pickStation(index).then(this.updateView, this.handleFailure);
	}

	refresh = () => {
		this.model.refresh().then(this.updateView, this.handleFailure);
	}
}

ReactDOM.render(<App/>, document.getElementById("app"));