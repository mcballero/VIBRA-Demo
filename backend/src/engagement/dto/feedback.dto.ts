import { IsIn, IsString } from "class-validator";

export class FeedbackDto {
  @IsString()
  eventId!: string;

  @IsIn(["LIKE", "DISLIKE", "ATTENDED"])
  reaction!: "LIKE" | "DISLIKE" | "ATTENDED";
}

