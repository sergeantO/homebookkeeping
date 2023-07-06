import cron from "node-cron"
import { balanceService } from "../services";

export const closePeriodTask = cron.schedule("* * 1 * *", function() {
  balanceService.closePeriod()
});