import { EmailService } from "./emailService";
import { ReindeerFeeder } from "./reindeerFeeder";
import { ScheduleService } from "./scheduleService";

export class Routine {
  private emailService: EmailService;
  private scheduleService: ScheduleService;
  private reindeerFeeder: ReindeerFeeder;

  constructor(
    emailService: EmailService,
    scheduleService: ScheduleService,
    reindeerFeeder: ReindeerFeeder
  ) {
    this.emailService = emailService;
    this.scheduleService = scheduleService;
    this.reindeerFeeder = reindeerFeeder;
  }

  start(): void {
    this.scheduleService.organizeMyDay(this.scheduleService.todaySchedule());
    this.reindeerFeeder.feedReindeers();
    this.emailService.readNewEmails();
    this.scheduleService.continueDay();
  }
}
