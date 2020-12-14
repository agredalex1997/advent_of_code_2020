const { expenseReport } = require('./expense-report.js');

console.log('possible iterations', expenseReport.length * (expenseReport.length - 1) * (expenseReport.length - 2))

let iterationsCounter = 0;

for (let i = 0; i < expenseReport.length; i++) {
  const val = expenseReport[i];

  if (val >= 2020) continue;

  const remainingExpenseReport = [...expenseReport.slice(0, i), ...expenseReport.slice(i + 1)];
  let shouldBreakExternalLoop = false;

  for (let j = 0; j < remainingExpenseReport.length; j++) {
    const val2 = remainingExpenseReport[j];

    if (val2 >= 2020 || (val + val2) >= 2020) continue;

    const lastRemainingExpenseReport = [...remainingExpenseReport.slice(0, j), ...remainingExpenseReport.slice(j + 1)];

    for (let k = 0; k < lastRemainingExpenseReport.length; k++) {
      iterationsCounter++;
      const val3 = lastRemainingExpenseReport[k];

      if (val3 >= 2020) continue;

      if (val + val2 + val3 === 2020) {
        console.log('iterations', iterationsCounter);
        console.log('answer', val * val2 * val3);
        shouldBreakExternalLoop = true;
        break;
      }
    }

    if (shouldBreakExternalLoop) break;
  }

  if (shouldBreakExternalLoop) break;
}
