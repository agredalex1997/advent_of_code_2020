const fs = require('fs');

function isValidPassport(passport) {
  const passportFields = Object.keys(passport).length;

  return passportFields === 8 || (passportFields === 7 && !passport.cid);
}

fs.readFile(`${__dirname}/passports.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  if (data) {
    const passports = data.split(/\n{2}/);

    let validPassports = 0;

    passports.forEach(passport => {
      const fields = passport.split(/[\n ]/);

      const passportObject = {};
      fields.forEach(field => {
        const [key, value] = field.split(':');
        passportObject[key] = value;
      });

      if (isValidPassport(passportObject)) validPassports++;
    });

    console.log({ validPassports });
  }
});
