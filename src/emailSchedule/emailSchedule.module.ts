import { Module } from "@nestjs/common";
import EmailSchedulingService from "./emailScheduling.service";

@Module({
    exports: [EmailSchedulingService],
    providers:[EmailSchedulingService],
})
export default class EmailShceduleModule {}
