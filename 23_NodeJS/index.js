/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qrimage from 'qr-image';
import fs from "fs"; //native node module

inquirer
  .prompt([
    {
    name: 'url',
    message: 'What url would you like to give?',
    type: 'input'
    }
  ])
  .then((answers) => {
    let qr_svg = qrimage.image(answers.url);
    qr_svg.pipe(fs.createWriteStream("my_qr_image.png"));
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
