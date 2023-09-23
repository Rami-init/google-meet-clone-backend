import { Field, ID, ObjectType } from "type-graphql";
import { Meet } from "../meet/meet.schema";
import { User } from "../users/user.schema";

@ObjectType()
export class Message {
  @Field((type) => ID, { description: "Id of the message" })
  id: string;

  @Field({ description: "Message content", nullable: true })
  message: string;

  @Field(() => User, { description: "User who sent the message" })
  user: User;

  @Field({ description: "Id of the user who sent the message", nullable: true })
  userId: string;

  @Field(() => Meet, { description: "Meet of the message", nullable: true })
  meet?: Meet;

  @Field({ description: "Id of the meet of the message", nullable: true })
  meetId?: string;

  @Field({ description: "Created date of the message", nullable: true })
  createdAt?: Date;
}
