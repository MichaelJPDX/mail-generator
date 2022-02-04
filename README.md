# Acquisition Email Build Script

Author: Michael Holland
Organization: Data Axle

This script was written to generate individual email files from an input HTML file and CSV data. 
It was created to address an issue where a deployment platform (ESP) used by the acquisition team 
did not support dynamic links or other forms of dynamic personalization. To get around that, this 
script will take an input CSV file and the message HTML and generate new HTML for each row of the 
data file, personalized with the data from the file.

## Install

To install, download or clone this repository to an (preferably) empty folder on your computer. 
Once dowloaded, open a terminal and change directory to the folder where this package is installed. 
Enter the command:

`npm install`

This should install the two required packages, and any dependencies they may have. Before proceeding 
to setup, make sure you have an `htmlout` folder in the script directory.

## Setup

You will need two input files to use the script:

### Data file

The data file is usually sent as a MS Excel file. Open the file in Excel and then save it as a CSV 
file. The first row of the file is usually a header row, which you don't want, so open the exported 
file in a text editor and remove the first row. Save the file in the directory where this script 
(and this README file) is located, named `data.csv`

### Email HTML source

The HTML source is usually supplied by someone else, often from an outside agency. You will want to 
ensure that the code is render checked as much as possible before using it. Ideally, the code will 
already be set up to use with this script, but check it anyway. The script uses handlebars 
(AKA mustache) notation to indicate dynamic data that needs to be filled in. So, for example, a link 
in the code might look like this:

```
<a href="https://{{HOME_PAGE_URL}}" target="_blank">
```

When run, the script will replace `{{HOME_PAGE_URL}}` with a column you select from the data file. 
The names of the placeholders are not important, since columns are mapped by number. Note that the 
placeholders must conform to valid javascript variable names, eg they can only consist of letters, 
numbers and the underscore. Spaces and other characters are not allowed.

The complete, updated, HTML file should be named `source.html` and placed in the same directory as 
the data file, script, etc.

### Edit the Script

The script is all set up to read the files above. You just need to edit two places in the script. 
First, find the following line which assigns the name of the output file:

```
    	outfile = csvrow[5];
```

Replace the number 5 with the column number from the spreadsheet that contains the desired name of 
the HTML file for this row. *Remember,* arrays start at index zero, so column A from the spreadsheet 
is 0, column B is 1, etc.

Next, find the following line which creates a data object mapping columns from the data file to 
the placeholders in the HTML file:

```
var context = { PHT: csvrow[6], DEALER_ADDRESS: csvrow[7], DEALER_CITY: csvrow[8], HOME_PAGE_URL: csvrow[9], ... };
```
The variable `csvrow` is an array containing one row of data from the CSV data file. You will need 
to determine which index of the array maps to which placeholder by counting columns in the original 
spreadsheet.

## Run It

You should be ready to run the script. I would strongly recommend you test with a data file that 
contains only two or three rows of data first, just to validate the mapping, etc. before you spit 
out 50 to 100 files. To run the script, just enter the following on the command line:

`node index.js`

There are some console messages so you'll know it's working. If you don't see any errors, you should 
see files in the htmlout folder. Open them an check that your mapping is correct. 

