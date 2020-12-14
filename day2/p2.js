const fs = require('fs');

fs.readFile(`${__dirname}/password-db.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  if (data) {
    const lines = data.split(/[\r\n]/);

    let validPasswordsCounter = 0;

    lines.forEach(line => {
      let [positions, char, text] = line.split(' ');
      char = char.replace(':', '');
      const [charAt1, charAt2] = positions.split('-').map(position => text.charAt(position - 1));
      const isCharAt1Equal = charAt1 === char;
      const isCharAt2Equal = charAt2 === char;

      const valid = (isCharAt1Equal || isCharAt2Equal) && !(isCharAt1Equal && isCharAt2Equal);

      if (valid) validPasswordsCounter++;
    });

    console.log({ validPasswordsCounter });
  }
});
