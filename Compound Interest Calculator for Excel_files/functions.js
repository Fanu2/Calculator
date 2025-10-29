/*
Copyright (c) 2010 Vertex42 LLC. All Rights Reserved.
isBlank function from: http://www.mattkruse.com/javascript/validations/source.html
Except for the isBlank function, which you can get from the above site, you may not copy or use this code without written permission from Vertex42.com
*/

function isBlank(val){
	if(val==null) { return true; }
	for(var i=0;i<val.length;i++) {
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){return false;}
	}
	return true;
}

function isNum(x){
	/* Tests for Numeric, and does not fail on blank */
	filter = /(^\-?\d+\.?$)|(^\-?\d*\.\d+$)/;
	if (filter.test(x)) {return true;}
	return false;
}

function removeCommas(str) {
	return str.replace(/\,/g,'');
}

function clearResults() {
	document.getElementById("interest").innerHTML = "";
}

function toCurrency(x,roundOpt,prefix,commas) {
	// Rounds to 100's, adds commas, and a specified prefix
	if ( !roundOpt ) { var roundOpt = 0; } // 0 = normal, -1 = round down, +1 = round up
	if ( !prefix ) { var prefix = ""; }
	if ( !commas ) { var commas = false; }
	// First Round to 100's
	if ( roundOpt == 1 ) {
		var num = Math.ceil(x*100)/100;
	} else if (roundOpt == -1) {
		var num = Math.floor(x*100)/100;
	} else {
		var num = Math.round(x*100)/100;
	}
	// Convert to String
	num = num.toFixed(2); // Add .00 precision
	num = num.toString()

	if ( commas == false ) {
		return prefix+num;
	} else {
		var p = num.split('.');
		var x1 = p[0];
		var x2 = p.length > 1 ? '.' + p[1] : '';
		var regex = /(\d+)(\d{3})/;
		while (regex.test(x1)) {
			x1 = x1.replace(regex, '$1' + ',' + '$2');
		}
		return prefix + x1 + x2;
	}
}

function xl_fv(rper,nper,pmt,pv,type) {
	// FUTURE VALUE
	// Similar to the FV function in Excel
	//
	// xl_fv(rper,nper,pmt,[pv=0],[type=0])
	// rate = Rate Per Period
	// nper = Number of Periods
    // pmt = Payment Per Period
	// pv = Present Value (default = 0)
	// type = Indicates when payments are due (default = 0 at end of period)
	if (!pv) var pv = 0;
	if (!type) var type = 0;
	
	var fv = null;	// Initialize
	if (rper == 0) {
		fv = -(pv + pmt*nper);
	} else {
		fv = -( pv*Math.pow((1+rper),nper) + pmt*(1+rper*type)*((Math.pow((1+rper),nper)-1)/rper) );
	}
	return fv;
}

function xl_pv(rper,nper,pmt,fv,type) {
	// PRESENT VALUE
	// Similar to the PV function in Excel
	//
	// xl_pv(rper,nper,pmt,[fv=0],[type=0])
	// rate = Rate Per Period
	// nper = Number of Periods
	// pmt = Payment per Period
	// fv = Future Value (default = 0)
	// type = Indicates when payments are due (default = 0 at end of period)
	if (!fv) var fv = 0;
	if (!type) var type = 0;
	
	var pv = null;	// Initialize
	if (rper == 0) {
		if (nper == 0) {
			return null; // division by zero error
		}
		pv = -(fv + pmt*nper);
	} else {
		if ( (Math.pow((1+rper),nper)) == 0) {
			return null; // division by zero error
		}
		pv = ( -fv-pmt*(1+rper*type)*(( Math.pow((1+rper),nper) -1 )/rper) ) / (Math.pow((1+rper),nper));
	}
	return pv;
}

function xl_pmt(rper,nper,pv,fv,type) {
	// Calculates the Payment for a Fixed-Rate Loan
	// Similar to the PMT function in Excel
	//
	// xl_pmt(rper,nper,pv,[fv],[type])
	// rate = Rate Per Period
	// nper = Number of Periods
	// pv = Present Value
	// fv = Future Value (default = 0)
	// type = Indicates when payments are due (default = 0 at end of period)
	if (!fv) var fv = 0;
	if (!type) var type = 0;
	
	var pmt = null;	// Initialize
	if (rper == 0) {
		if (nper == 0) {
			return null; // division by zero error
		}
		pmt = -(fv+pv)/nper;
	} else {
		if ( (Math.pow(1+rper,nper)-1) == 0) {
			return null; // division by zero error
		} else if ( (1+rper*type) == 0 ) {
			return null; // division by zero error
		}
		pmt = (-fv-pv*Math.pow((1+rper),nper)) / (1+rper*type) / ((Math.pow((1+rper),nper)-1)/rper);
	}
	return pmt;
}

function xl_rate(nper,pmt,pv,fv,type,guess) {
	// Calculates the RATE for a Fixed-Rate Loan, similar to the RATE function in Excel
	//
	// Uses Newton-Raphson method to iteratively solve for the RATE from the 
	// starting guess. RATE can have zero or more solutions. If the successive 
	// results of RATE do not converge to within 0.0000001 after 20 iterations, 
	// RATE returns NULL.
	//
	// xl_rate(nper,pmt,pv,[fv=0],[type=0],[guess=0.01])
	// nper = Number of Periods
	// pmt = Payment per Period
	// pv = Present Value
	// fv = Future Value (default = 0)
	// type = Indicates when payments are due (default = 0 at end of period)
	if (!fv) var fv = 0;
	if (!type) var type = 0;
	if (!guess) var guess = 0.05;

	var rn = guess;	// Initial guess

	var fn = pv*Math.pow((1+rn),nper)+pmt*(1+rn*type)*(Math.pow((1+rn),nper)-1)/rn+fv;
	
	var tolr = 0.000001;	// Tolerance on rate
	// Calculate the first numerical derivative
	var r1 = rn+tolr;
	if (r1 == 0) {
		f1 = pmt*nper + pv + fv;
	} else {
		f1 = pv*Math.pow((1+r1),nper)+pmt*(1+r1*type)*(Math.pow((1+r1),nper)-1)/r1+fv;
	}
	var dfdr = (f1-fn)/(r1-rn);
	// Calculate new rate
	var rnew = rn-fn/dfdr;
	if (rnew == 0) {
		fnew = pmt*nper + pv + fv;
	} else {
		fnew = pv*Math.pow((1+rnew),nper)+pmt*(1+rnew*type)*(Math.pow((1+rnew),nper)-1)/rnew+fv;
	}
	var iter = 1;
	while (Math.abs(rnew-rn)>tolr) {
		// Numerically determine the derivative
		// Division by zero is avoided by above while statement condition
		dfdr = (fnew-fn)/(rnew-rn);
		// Assign new values to rn and fn
		rn = rnew;
		fn = fnew;
		// Calculate new rate
		rnew = rn-fn/dfdr;
		if (rnew == 0) {
			fnew = pmt*nper + pv + fv;
		} else {
			fnew = pv*Math.pow((1+rnew),nper)+pmt*(1+rnew*type)*(Math.pow((1+rnew),nper)-1)/rnew+fv;
		}
		// Next iteration
		iter = iter + 1;
		if (iter > 20) {
			return null;	// Couldn't converge - so return null
		}
	}
	return rnew;
}

function xl_nper(rate,pmt,pv,fv,type) {
	// Calculates the Number of Payments (NPER) for a Fixed-Rate Loan, 
	// similar to the NPER function in Excel
	//
	// xl_nper(rate,pmt,pv,[fv=0],[type=0])
	// rate = Interest rate per period
	// pmt = Payment per Period
	// pv = Present Value (for a Loan Principal, enter as negative)
	// fv = Future Value (default = 0)
	// type = Indicates when payments are due (default = 0 at end of period)
	if (!fv) var fv = 0;
	if (!type) var type = 0;

	if(rate == 0) {
		return null; // Would cause Div/0 error
	}
	if(rate == -1) {
		return null; // Results in Math.log(0)
	}
	var m = pmt*(1+rate*type)/rate;
	if( m+pv == 0 ) {
		return null; // Results in Div/0 error
	}
	var nper = Math.log((-fv+m)/(pv+m))/Math.log(1+rate);
	return nper;
}
