const fs = require('fs');

fs.readFile(`${__dirname}/answers.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);

  if (data) {
    const groups = data.split(/\n{2}/);

    let total = 0;

    groups.forEach(group => {
      const groupAnswers = group.split(/\n/).join('').split('');
      const uniqueGroupAnswers = Array.from(new Set(groupAnswers)).join('');
      total += uniqueGroupAnswers.length;
    });

    console.log({ total });
  }
});
