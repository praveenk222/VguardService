import { NgModule } from "@angular/core";

import { TimeDifferencePipe } from "./time-difference.pipe";
import { TimeampmPipe } from "./timeampm.pipe";
import { FormatTimePipe } from "./format-time.pipe";
import { FilterPipe } from "./filter.pipe";

@NgModule({
  declarations: [
    // CustomDateTimePipe,
    TimeDifferencePipe,
    FilterPipe,
    FormatTimePipe,
    TimeampmPipe

  ],
  exports: [
    // CustomDateTimePipe,
    TimeDifferencePipe,
    FilterPipe,
    FormatTimePipe,
    TimeampmPipe

  ],
  providers: [
    // CustomDateTimePipe,
    TimeDifferencePipe,
    FilterPipe,
    FormatTimePipe,
  ],
})
export class SharedModule { }
