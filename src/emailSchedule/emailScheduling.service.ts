import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
 
@Injectable()
export default class EmailSchedulingService {
//   @Cron('* * * * * *')
//   log() {
//     console.log('Hello world!');
//   }


@Interval(60000)
log() {
  console.log('Called every minute');
}

@Timeout(60000)
logd() {
  console.log('Called once after a minute');
}
}

// 0 30 11 * * 6,7 – 11:30:00 on Saturday, and Sunday,
// 0 0 8 * 12 5-7 – 8:00:00 on Friday, Saturday, and Sunday (only in December),
// 0 */15 10-12 * * * – every 15 minutes between 10AM and 12AM.