const fs = require('fs');

let initialRules;

fs.readFile(`${__dirname}/bag-rules.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);
  if (data) {
    const rules = data.split(/\n/);

    initialRules = rules.map(rule => {
      let [container, canContain] = rule.split(' bags contain ');
      canContain = canContain
        .split(',')
        .filter(bag => bag !== 'no other bags.')
        .map(bag => bag
          .replace('.', '')
          .replace(/(bags|bag)/, '')
          .trim())
        .map(bag => ({
          qty: bag.charAt(0),
          container: bag.slice(2),
        }));

      return { container, canContain };
    });


    const rulesObjects = JSON.parse(JSON.stringify(initialRules));
    rulesObjects.forEach(rule => {
      rule.canContain = rule.canContain.map(bag => rulesObjects.find(rule => rule.container === bag.container));
    });

    console.log(countBagsInside(rulesObjects.find(rule => rule.container === 'shiny gold')));
  }
});

function countBagsInside(containerBag) {
  let total = 0;
  const containSomething = containerBag.canContain.length > 0;

  if (containSomething) {
    total += containerBag.canContain.reduce((acc, bag) => {
      const qty = initialRules.find(rule => rule.container === containerBag.container).canContain.find(rule => rule.container === bag.container).qty;
      return acc + parseInt(qty) + (qty * countBagsInside(bag, containerBag.container));
    }, 0);
  }

  return total;
}
