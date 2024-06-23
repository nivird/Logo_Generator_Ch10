//importing the npm packages

import inquirer from 'inquirer';
import fs from 'fs/promises';
import { Circle, Triangle, Square } from './lib/shapes.js';

//creating the object questions with inputs
const questions = [
    {
        //getting input for logo
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be up to 3 characters.'
    },
    {
        //get the text color input
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
        //get the shape input
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for the logo:',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        // get the shape color
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal):'
    }
];

//using the package to get the choices using switch statement
inquirer.prompt(questions).then(answers => {
    const { text, textColor, shape, shapeColor } = answers;
    let shapeInstance;
    switch (shape) {
        case 'Circle':
            shapeInstance = new Circle(shapeColor);
            break;
        case 'Triangle':
            shapeInstance = new Triangle(shapeColor);
            break;
        case 'Square':
            shapeInstance = new Square(shapeColor);
            break;
    }

    const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeInstance.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
    `;
//create the logo file with writefile function
    fs.writeFile('logo.svg', svgContent.trim())
        .then(() => console.log('Generated logo.svg'))
        .catch(err => console.error('Error writing file:', err));
});
