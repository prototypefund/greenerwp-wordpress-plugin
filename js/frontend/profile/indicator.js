/**
 * Show the profile indicator.
 */
class Indicator {
  constructor( args ) {
		this.args = args;
		this.render();
	}

	updateTransferIndicator() {
		if ( performance === undefined ) {
			return;
		}
		var list = performance.getEntriesByType( "resource" );
		if ( list === undefined ) {
			return;
		}

		var transferred = 0;
		for ( var i=0; i < list.length; i++ ) {
			// console.log("== Resource[" + i + "] - " + list[i].name);
			if ( "transferSize" in list[i] ) {
				// console.log("... transferSize[" + i + "] = " + list[i].transferSize);
				transferred += list[i].transferSize;
			}
		}
		var transferKBValueSpan = document.querySelector( ".ltwp-indicator__transfer-kb-value" );
		if ( transferKBValueSpan ) {
			transferKBValueSpan.textContent = Math.round( transferred / 1000 );
		}
		var transferCO2ValueSpan = document.querySelector( ".ltwp-indicator__transfer-co2-value" );
		if ( transferCO2ValueSpan ) {
			var CO2Value = Math.round( transferred * ( 20 / ( 1024 * 1024 ) ) * 100 ) / 100;
			transferCO2ValueSpan.textContent = CO2Value;
		}
	}

	render() {
		document.body.innerHTML += this.args.widgetHTML;
		this.updateTransferIndicator();
	};
};

export default Indicator;