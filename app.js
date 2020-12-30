const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");  // npm  module - inquirer 
const path = require("path"); // node native module - path
const fs = require("fs"); // node native module - fs, for 

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// TODO  Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
'use strict';
var output = [];
var questions = [
	{
		type: 'input',
		name: 'name',
		message: 'What is the first and last name of this employee? ',
	},
		{
		type: 'input',
		name: 'email',
		message: 'What is the email address of this employee? ',
	},
	{
        message: 'What is the primary role of this employee? ',
        type: 'list',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern' ]
    },
	{
		type: 'input',
		name: 'office',
		message: 'What is the office number of this manager? ',
		when: function (answers) {
		  return answers.role === 'Manager';
		},
	},
	{
		type: 'input',
		name: 'github',
		message: 'What is the github username of this engineer? ',
		when: function (answers) {
		  return answers.role === 'Engineer';
		},
	},
	{
		type: 'input',
		name: 'school',
		message: 'What is the school name of this intern? ',
		when: function (answers) {
		  return answers.role === 'Intern';
		},
	},
	{
		type: 'input',
		name: 'emplid',
		message: "What is their employee ID number?",
	},
	{
		type: 'confirm',
		name: 'askAgain',
		message: 'Do you want to add another employee to this summary?',
		default: true,
	},
];

//alternatively provide a default value of n/a for questions that are not asked
function ask() {
  inquirer.prompt(questions).then((answers) => {
    output.push(answers.name);
	output.push(answers.email);
	output.push(answers.emplid);
	output.push(answers.role);
	if(answers.role === 'Manager'){
		output.push(answers.office)
	}
	else if (answers.role === 'Engineer'){
		output.push(answers.github)
	}	
	else if (answers.role === 'Intern'){
		output.push(answers.school)
	}
    if (answers.askAgain) {
      ask();
    } else {
	   // only render output to html if this condition is reached.
	   //output.join
	  console.log('\n');
      console.log('Final output:', output.join(', '));
    }
  });
}

ask();

// TODO After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//TODO After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
