const fs = require('fs');

fs.readFile(`${__dirname}/password-db.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  if (data) {
    const lines = data.split(/[\r\n]/);

    let validPasswordsCounter = 0;

    lines.forEach(line => {
      let [limits, char, text] = line.split(' ');
      const [min, max] = limits.split('-');
      char = char.replace(':', '');

      const replaced = text.replace(new RegExp(`[^${char}]`, 'g'), '');
      const valid = replaced.length >= min && replaced.length <= max;

      if (valid) validPasswordsCounter++;
    });

    console.log({ validPasswordsCounter });
  }
});
