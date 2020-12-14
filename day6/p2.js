const fs = require('fs');

fs.readFile(`${__dirname}/answers.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);

  if (data) {
    const groups = data.split(/\n{2}/);

    let total = 0;

    groups.forEach(group => {
      const persons = group.split(/\n/);
      const person1 = persons[0].split('');

      person1.forEach(answer => {
        if (persons.slice(1).every(person => person.includes(answer))) {
          total++;
        }
      });
    });

    console.log({ total });
  }
});
