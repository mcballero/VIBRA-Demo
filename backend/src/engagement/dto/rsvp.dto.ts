import { IsIn, IsOptional, IsString } from "class-validator";

export class RsvpDto {
  @IsString()
  eventId!: string;

  @IsOptional()
  @IsIn(["GOING", "INTERESTED"])
  status?: "GOING" | "INTERESTED";
}

