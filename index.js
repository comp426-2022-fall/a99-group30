#!/usr/bin/env node

import minimist from "minimist"
import fetch from "node-fetch"

const args = minimist(process.argv.slice(2));

if (args.h) {
	console.log("Usage: index.js [options] -h HELP");
	console.log("    -h            Show this help message and exit.");
	console.log("    -r            Recieve a random recipe.");
	console.log("    -k            Recieve a recipe based on a main ingredient.");
    console.log("    -a            Recieve a recipe based on an area.");
    console.log("    -c            Recieve a recipe based on a category.");
    console.log("    -l            List catagories.");
    console.log("    -m            List areas.");
    console.log("    -n            List ingredients.");
    console.log("    -h            Recieve previously requested recipies,");
	console.log("    -j            Echo pretty JSON from THEMEALDB API and exit.");
	process.exit(0);
}

// NOTES FOR Documentation: Can only seelct one arg at a time. 
let argcount = 0;

if (args.r) {
    url = 'random.php';
    argcount += 1;
} 
if (args.k) {
    url = 'filter.php?i=' + args.i;
    argcount += 1;
}
if (args.a) {
    url = 'filter.php?a=' + args.a;
    argcount += 1;
}
if (args.i) {
    url = 'filter.php?c=' + args.c;
    argcount += 1;
}
if (args.l) {
    url = 'list.php?c=list'
    argcount += 1;
}
if (args.m) {
    url = 'list.php?a=list'
    argcount += 1;
}
if (args.n) {
    url = 'list.php?i=list'
    argcount += 1;
}

let baseUrl = "https://api.open-meteo.com/v1/forecast?";
let url = baseUrl + 'latitude=' + latit + '&longitude=' + longit + "&timezone=" + timezone + "&daily=precipitation_hours";

const response = await fetch(url);
const data = await response.json();

if ("j" in args) {
	console.log(data);
	process.exit(0);
}

let precipitationForecast = data.daily.precipitation_hours;
let precipitation = precipitationForecast[dayOffset];
let message = ""

if (precipitation === 0) {
	message += "You will not need your galoshes ";
} else {
	message += "You might need your galoshes ";
}
if (dayOffset === 0) {
	message += 'today.';
} else if (dayOffset === 1) {
	message += 'tomorrow.';
} else {
	message += 'in ' + dayOffset + ' days.';
}
console.log(message);