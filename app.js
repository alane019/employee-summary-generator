const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");  // npm  module - inquirer 
const path = require("path"); // node native module - path
const fs = require("fs"); // node native module - fs
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = []; // array of employee objects

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
		name: 'officeNumber',
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
		name: 'id',
		message: "What is the employee's ID number?",
	},
	{
		type: 'confirm',
		name: 'askAgain',
		message: 'Do you want to add another employee to this summary?',
		default: true,
	},
];

// ask() function initiates a new round of inquirer questions for a new employee type
function ask() {
  inquirer.prompt(questions).then((answers) => {
	// user response values will be pushed to a newed-up, role-specific, employee sub-class object

	if(answers.role === 'Manager'){		
		//instantiate a new <<Manager>> object with the inquirer response values passed as parameters
		// including the response to the conditional, role-specific, <<officeNumber>> question.
		employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber ));
	} 
	else if (answers.role === 'Engineer'){
		//instantiate a new <<Engineer>> object with the inquirer response values passed as parameters
		// including the response to the conditional, role-specific,<<github>> question.
		employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github ));
	}	
	else if (answers.role === 'Intern'){
		//instantiate a new <<Intern>> object with the inquirer response values passed as parameters
		// including the response to the conditional, role-specific, <<school>> question.
		employees.push(new Intern(answers.name, answers.id, answers.email, answers.school ));
	}

	//determines if another round of inquirer prompts will be presented, or if current values passed to render funciton
    if (answers.askAgain) {
      ask();
    } else {
	   // Once user has added all desired employees, pass the employee array to render function
	 console.log("\n Employees array to be passed to render function: \n");
	 console.log(employees);
	}
  });
}

// runs the first round of inquirer prompts
ask();

// TODO After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//TODO After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
