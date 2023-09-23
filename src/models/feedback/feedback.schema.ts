import { Field, ID, ObjectType } from "type-graphql";
import { Meet } from "../meet/meet.schema";
import { User } from "../users/user.schema";

@ObjectType()
export class FeedBack {
  @Field((type) => ID, { description: "Name of the user" })
  id: string;

  @Field((type) => User, { description: "User who sent the message" })
  user: User;

  @Field({ description: "Id of the user who create feedback", nullable: true })
  userId: string;

  @Field({ description: "Created at of feedback" })
  createdAt: Date;

  @Field((type) => Meet, { description: "Meet of the user" })
  meet?: Meet;

  @Field({ description: "Id of the meet", nullable: true })
  meetId?: string;

  @Field()
  stars: number;
}
