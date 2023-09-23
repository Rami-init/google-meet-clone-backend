import { Field, ID, ObjectType } from "type-graphql";
import { FeedBack } from "../feedback/feedback.schema";
import { Message } from "../messages/message.schema";
import { User } from "../users/user.schema";

@ObjectType()
export class Meet {
  @Field((type) => ID, { description: "Id of the meet" })
  id?: string;

  @Field((type) => Boolean, {
    description: "Is the meet have enable screen sharing",
    defaultValue: false,
  })
  enableScreenSharing?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable chat",
    defaultValue: false,
  })
  enableChat?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable video",
    defaultValue: false,
  })
  enableVideo?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable microphone",
    defaultValue: false,
  })
  enableMicrophone?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable whiteboard",
    defaultValue: false,
  })
  enableWhiteboard?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable notes",
    defaultValue: false,
  })
  enableNotes?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable presentation",
    defaultValue: false,
  })
  organizedAdministration?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable notifications",
    defaultValue: false,
  })
  enableNotifications?: boolean;

  @Field((type) => Boolean, {
    description: "Is the meet enable participants",
    defaultValue: false,
  })
  isActive?: boolean;

  @Field((type) => Number, {
    description: "Duration of the meet",
    nullable: true,
  })
  duration?: number;

  @Field({ description: "created at the meet" })
  createdAt: Date;

  @Field({ description: "Host id of the meet", nullable: true })
  hostId?: string;

  @Field((type) => User, { description: "Host of the meet", nullable: true })
  host?: User;

  @Field((type) => [User], {
    description: "Participants of the meet",
    nullable: true,
  })
  participants?: User[];

  @Field(() => [Message], { nullable: true, description: "Chat of the meet" })
  chat?: Message[] | null;

  @Field(() => [FeedBack], {
    nullable: true,
    description: "FeedBack of the meet",
  })
  feedBack?: FeedBack[] | null;
}
