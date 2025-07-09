import { CronJob } from "cron";

console.log("Before job instantiation");
const job = new CronJob("*/5 * * * * *", function () {
  const d = new Date();
  console.log("Every 5 seconds:", d);
});
console.log("After job instantiation");
job.start();
