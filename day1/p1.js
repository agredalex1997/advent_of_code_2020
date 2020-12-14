const { expenseReport } = require('./expense-report.js');

console.log('possible iterations', expenseReport.length * (expenseReport.length - 1))

let iterationsCounter = 0;

for (let i = 0; i < expenseReport.length; i++) {
  const val = expenseReport[i];

  if (val >= 2020) continue;

  const remainingExpenseReport = [...expenseReport.slice(0, i), ...expenseReport.slice(i + 1)];
  let shouldBreakExternalLoop = false;

  for (let j = 0; j < remainingExpenseReport.length; j++) {
    iterationsCounter++;
    const val2 = remainingExpenseReport[j];

    if (val2 >= 2020) continue;

    if (val + val2 === 2020) {
      console.log('iterations', iterationsCounter);
      console.log('answer', val * val2);
      shouldBreakExternalLoop = true;
      break;
    }
  }

  if (shouldBreakExternalLoop) break;
}
