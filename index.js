import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';


function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  
const question = [
    {
        message: 'Enter a URL',
        name: 'URL',
        validate(value) {
            if(isValidHttpUrl(value)) {
                return true;
            }
            return "Please enter a valid URL!";
        },
      },
] 
inquirer
  .prompt(question) 
  .then((answer) => {
    // console.log(answer.URL)
    const url = answer.URL;
    
 
    var qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('custom.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });

