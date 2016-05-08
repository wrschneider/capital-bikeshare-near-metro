To get started

* npm install
* npm run develop

Uses the [Capital Bikeshare API](https://github.com/jaxgeller/node-capital-bikeshare) with node server-side.  There are two reasons to do this instead of accessing bikeStations.xml directly over AJAX, which would have been simpler:

*  CORS issues - Capital Bikeshare does not set appropriate headers to allow CORS requests; the node/express app is effectively a CORS proxy
*  Smaller response size - the response to the client only contains the 5 closest stations to the selected Metro stop, instead of the full set of bike stations. 
