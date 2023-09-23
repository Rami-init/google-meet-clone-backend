import { Field, ObjectType } from "type-graphql";
import { FeedBack } from "../feedback/feedback.schema";
import { Meet } from "../meet/meet.schema";
import { Message } from "../messages/message.schema";

@ObjectType()
export class User {
  @Field({ description: "Id of the user" })
  id: string;

  @Field({ description: "Username of the user" })
  username: string;

  @Field({ description: "Name of the user" })
  name: string;

  @Field({ description: "Email of the user" })
  email: string;

  @Field({ description: "Profile picture of the user", nullable: true })
  pic?: string;

  @Field(() => [Meet], { nullable: true })
  hostedMeets?: Meet[] | null;

  @Field(() => [Meet], { nullable: true })
  meets?: Meet[] | null;

  @Field(() => [Message], { nullable: true })
  message?: Message[] | null;

  @Field(() => [FeedBack], { nullable: true })
  feedBack?: FeedBack[] | null;
}
