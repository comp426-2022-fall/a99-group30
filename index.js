#!/usr/bin/env node

import minimist from "minimist"
import fetch from "node-fetch"
// NOTES FOR Documentation: Must install these.

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

// NOTES FOR Documentation: Can only seelct one arg at a time. OR arg + j
let argcount = 0;
let url = '';

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
if (argcount > 1) {
    console.log("You may only specify one argument per request.")
    process.exit(0);
}

const baseUrl = 'https://www.themealdb.com/api/json/v1/1/' + url;

const response = await fetch(baseUrl);
const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
}
if (!data.meals) {
    console.log ("No meals found using your search parameters :(")
    process.exit(0);
} else {
    console.log("Meal Name: " + data.meals[0].strMeal + '\n')
    console.log("Instructions: \n" + data.meals[0].strInstructions)
}
