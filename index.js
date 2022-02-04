const fs = require('fs')

const Handlebars = require("handlebars");
var csvParse = require('csv-parse');
const myParser = csvParse.parse({delimeter: ','})

var wroteStack = [];
var outfile = '';

var csvData=[];

// source.html is the "base" message file with id tags for updating by this script. 
try {
  const source = fs.readFileSync('source.html', 'utf8');
  var template = Handlebars.compile(source);
	
	// Read in the data file in CSV format
	fs.createReadStream('data.csv')
    .pipe(myParser)
    .on('data', function(csvrow) {
    	// loop through data nd for each row of the file, check if we've written the file
    	outfile = csvrow[5];
    	if (!wroteStack.includes(outfile)) {
    		//  have not written this file yet, so read rest of columns and create output
    		var context = { PHT: csvrow[6], DEALER_ADDRESS: csvrow[7], DEALER_CITY: csvrow[8], HOME_PAGE_URL: csvrow[9], DEALER_NAME: csvrow[10], PHONE: csvrow[11], SCHEDULE_SERVICE: csvrow[12], STATE: csvrow[13], STORE_HEADER: csvrow[14], ZIP: csvrow[15], offer_img_top: csvrow[16], offer_img_btm: csvrow[17], offer_img_alt: csvrow[18], disclaimer: csvrow[19] };
    		var html = template(context);
			
			// write to file
			//console.log(root.toString())
			try {
			  fs.writeFileSync('htmlout/' + outfile, html.toString());
			  //file written successfully
			} catch (err) {
			  console.error(err)
			}
    		// push this file onto stack
    		wroteStack.push(outfile);
	        console.log(outfile); // give us something to read while script runs
    	}
    })
    .on('end',function() {
      console.log("DONE!");
    });
} catch (err) {
  console.error(err)
}
