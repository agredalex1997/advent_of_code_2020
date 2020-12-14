const fs = require('fs');

fs.readFile(`${__dirname}/bag-rules.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);
  if (data) {
    const rules = data.split(/\n/);

    const rulesObjects = rules.map(rule => {
      let [container, canContain] = rule.split(' bags contain ');
      canContain = canContain
        .split(',')
        .filter(bag => bag !== 'no other bags.')
        .map(bag => bag
          .replace('.', '')
          .replace(/(bags|bag)/, '')
          .trim()
          .slice(2));
      return { container, canContain };
    });

    rulesObjects.forEach(rule => {
      rule.canContain = rule.canContain.map(bag => rulesObjects.find(rule => rule.container === bag));
    });

    let canContainShinyGoldBagCount = 0;

    rulesObjects.forEach(rule => {
      if (canContainShinyGoldBag(rule)) canContainShinyGoldBagCount++;
    });

    console.log({ canContainShinyGoldBagCount });
  }
});

function canContainShinyGoldBag(rule) {
  const canContainSomething = rule.canContain.length > 0;

  if (canContainSomething) {
    return rule.canContain.some(bag => bag.container === 'shiny gold' || canContainShinyGoldBag(bag));
  } else {
    return false;
  }
}
