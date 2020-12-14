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

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      if (instruction.operation === OPS.JMP) {
        instruction.operation = OPS.NOP;
        if (executeInstructions(instructions)) break;
        instruction.operation = OPS.JMP;
      } else if (instruction.operation === OPS.NOP) {
        instruction.operation = OPS.JMP;
        if (executeInstructions(instructions)) break;
        instruction.operation = OPS.NOP;
      }
    }
  }
});

function executeInstructions(instructions) {
  let i = 0;
  let acc = 0;

  let fixed = false;

  while (true) {
    if (i === instructions.length) {
      console.log({ acc });
      fixed = true;
      break;
    }

    const instruction = instructions[i];

    if (instruction.timesExecuted > 0) {
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

  instructions.forEach(instruction => instruction.timesExecuted = 0);
  return fixed;
}
