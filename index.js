#!/usr/bin/env node

import minimist from "minimist"
import fetch from "node-fetch"
import { addMeal, addUser, getMeals, getUser } from "./database.js";
import prompt from "prompt-sync";
// NOTES FOR Documentation: Must install these.

const args = minimist(process.argv.slice(2));


if (args.h) {
	console.log("Usage: index.js -h HELP");
	console.log("    -h            Show this help message and exit.");
	console.log("    -r            Recieve a random recipe.");
	console.log("    -k            Recieve a recipe based on a main ingredient.");
    console.log("    -a            Recieve a recipe based on an area.");
    console.log("    -c            Recieve a recipe based on a category.");
    console.log("    -l            List catagories.");
    console.log("    -m            List areas.");
    console.log("    -n            List ingredients.");
    console.log("    -n            List ingredients.");
    console.log("    -s            Reduced output.");
    console.log("    -o            Recieve previously requested recipies,");
	console.log("    -j            Echo pretty JSON from THEMEALDB API and exit.");
	process.exit(0);
}

// NOTES FOR Documentation: Can only seelct one arg at a time. OR arg + j, or arg + s
let argcount = 0;
let url = '';

// Parse Args.
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
if (args.c) {
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
    console.log("You may only specify one reciepe selection argument per request.")
    process.exit(0);
} else if (argcount = 0) {
    url = 'random.php';
}
// Ask for user login.
const promp = prompt();
const username = promp('username:  ');
const password = promp('password:  ');
let user = getUser(username, String(password));
//console.log(user)
if (!user) {
    // There is no account for username, ask them to create one.
    let ans = promp("Could not log in. Would you like to create a new account (yes/no)? ");
    if (ans === 'yes') {
        const email = promp('email:  ');
        addUser(username, email, password);
        user = getUser(username, String(password));
    }
    else {
        console.log('Please try signing in again.')
        process.exit(0);
    }
}
if (args.o) {
    console.log('\nYour Meal History');
    const meals = (getMeals(user.login));
    for (let i = 0; i < getMeals(user.login).length; i++) {
        console.log(getMeals(user.login)[i].name);
    }
    process.exit(0);
}

// Fetch Json.
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/' + url

const response = await fetch(baseUrl)
const data = await response.json()

// Return json string.
if (args.j) {
	console.log(data);
	process.exit(0);
}
// Convert Json to string and output.
if (!data.meals) {
    console.log ("No meals found using your search parameters :(")
    process.exit(0);
} else if (args.l) {
    for (let i = 1; i < data.meals.length; i++) {
        console.log(data.meals[i].strCategory)
    }
} else if (args.m) {
    for (let i = 1; i < data.meals.length; i++) {
        console.log(data.meals[i].strArea)
    }
} else if (args.n) {
    for (let i = 1; i < data.meals.length; i++) {
        console.log(data.meals[i].strIngredient)
    }
} else if (args.s) {
    console.log("Meal Name: " + data.meals[0].strMeal + '\n')
    console.log("Instructions: \n" + data.meals[0].strInstructions )
    addMeal(user.login, data.meals[0].strMeal)
} else {
    let ingredients = "";
    if(data.meals[0].strIngredient1 !== '') {
        ingredients = ingredients + (data.meals[0].strIngredient1)
    }
    if(data.meals[0].strIngredient2 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient2)
    }
    if(data.meals[0].strIngredient3 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient3)
    }
    if(data.meals[0].strIngredient4 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient4)
    }
    if(data.meals[0].strIngredient5 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient5)
    }
    if(data.meals[0].strIngredient6 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient6)
    }
    if(data.meals[0].strIngredient7 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient7)
    }
    if(data.meals[0].strIngredient8 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient8)
    }
    if(data.meals[0].strIngredient9 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient9)
    }
    if(data.meals[0].strIngredient10 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient10)
    }
    if(data.meals[0].strIngredient11 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient11)
    }
    if(data.meals[0].strIngredient12 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient12)
    }
    if(data.meals[0].strIngredient13 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient13)
    }
    if(data.meals[0].strIngredient14 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient14)
    }
    if(data.meals[0].strIngredient15 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient15)
    }
    if(data.meals[0].strIngredient16 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient16)
    }
    if(data.meals[0].strIngredient17 !== '') {
        ingredients = ingredients + ", " + (data.meals[0].strIngredient17)
    }
    if(data.meals[0].strIngredient18 !== '') {
        ingredients = ingredients + ", " + console.log(data.meals[0].strIngredient18)
    }
    if(data.meals[0].strIngredient19 !== '') {
        ingredients = ingredients + ", " + console.log(data.meals[0].strIngredient19)
    }
    if(data.meals[0].strIngredient20 !== '') {
        ingredients = ingredients + ", " + console.log(data.meals[0].strIngredient20)
    }
    
    console.log("Meal Name: " + data.meals[0].strMeal + '\n')
    console.log("Category: " + data.meals[0].strCategory + '\n')
    console.log("Area: " + data.meals[0].strArea + '\n')
    console.log("Ingrediens: " + ingredients + '\n')
    console.log("Source: " + data.meals[0].strSource + '\n')
    console.log("Instructions: '\n'" + data.meals[0].strInstructions)

    addMeal(user.login, data.meals[0].strMeal)
}
process.exit(0);
