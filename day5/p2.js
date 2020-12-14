const fs = require('fs');

function getRow(code, initialLimits, letters) {
  let limits = initialLimits;
  let remainingCode = code;
  const { upperHalf, lowerHalf } = letters;

  while (limits[1] - limits[0] > 1) {
    const [min, max] = limits;
    const letter = remainingCode.charAt(0);
    remainingCode = remainingCode.substring(1);

    if (letter === lowerHalf) {
      limits = [limits[0], Math.floor((min + max) / 2)];
    } else if (letter === upperHalf) {
      limits = [Math.ceil((min + max) / 2), limits[1]];
    }
  }

  if (remainingCode === lowerHalf) {
    return limits[0];
  } else if (remainingCode === upperHalf) {
    return limits[1];
  }
};

fs.readFile(`${__dirname}/boarding-passes.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);

  if (data) {
    let seats = data.split(/\n/);

    seats = seats.map(seat => ({
      seat,
      row: getRow(seat.substring(0, 7), [0, 127], {
        lowerHalf: 'F',
        upperHalf: 'B',
      }),
      column: getRow(seat.substring(seat.length - 3), [0, 7], {
        lowerHalf: 'L',
        upperHalf: 'R',
      }),
    }));

    seats = seats.map(seat => ({
      ...seat,
      id: seat.row * 8 + seat.column,
    }));

    seats = seats.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let i = 0; i < seats.length; i++) {
      if (seats[i + 1].id != seats[i].id + 1) {
        console.log({ mySeat: seats[i].id + 1 });
        break;
      }
    }
  }
});
