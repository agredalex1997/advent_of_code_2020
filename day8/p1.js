const fs = require('fs');

const OPS = {
  NOP: 'nop',
  ACC: 'acc',
  JMP: 'jmp',
};

fs.readFile(`${__dirname}/instructions.txt`, 'utf8', (err, data) => {
  if (err) console.error(err);
  if (data) {
    let instructions = data.split(/\n/);
    instructions = instructions.map(instruction => {
      const [operation, argument] = instruction.split(' ');

      return {
        operation,
        argument: parseInt(argument),
        timesExecuted: 0,
      };
    });

    let i = 0;
    let acc = 0;

    while (true) {
      const instruction = instructions[i];

      if (instruction.timesExecuted > 0) {
        console.log('infinite loop!');
        console.log({ acc });
        break;
      }

      const { operation, argument } = instruction;

      if (operation === OPS.ACC) {
        acc += argument;
        i++;
      } else if (operation === OPS.JMP) {
        i += argument;
      } else if (operation === OPS.NOP) {
        i++;
      }

      instruction.timesExecuted++;
    }
  }
});
