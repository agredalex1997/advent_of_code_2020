const fs = require('fs');

const HGT_UNITS = {
  IN: 'in',
  CM: 'cm',
};

function isBetween(val, min, max) {
  return val >= min && val <= max;
}

function isValidPassport(passport) {
  let { byr, iyr, eyr, hgt, hcl, ecl, cid, pid } = passport;
  const passportFields = Object.keys(passport).length;

  if (passportFields < 7) return false;
  if (passportFields === 7 && cid) return false;

  if (byr.length !== 4 || !isBetween(byr, 1920, 2002)) return false;
  if (iyr.length !== 4 || !isBetween(iyr, 2010, 2020)) return false;
  if (eyr.length !== 4 || !isBetween(eyr, 2020, 2030)) return false;

  const hgtNumber = hgt.substring(0, hgt.length - 2);
  const hgtUnit = hgt.substring(hgt.length - 2);

  if (hgtUnit === HGT_UNITS.CM) {
    if (!isBetween(hgtNumber, 150, 193)) return false;
  } else if (hgtUnit === HGT_UNITS.IN) {
    if (!isBetween(hgtNumber, 59, 76)) return false;
  } else {
    return false;
  }

  if (!/^#[0-9a-f]{6}$/.test(hcl)) return false;
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) return false;

  if (!/^[0-9]{9}$/.test(pid)) return false;

  return true;
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
