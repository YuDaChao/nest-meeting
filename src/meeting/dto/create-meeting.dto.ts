export class CreateMeetingDto {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  remindId: number;
  frequencyId: number;
  userId: number;
  roomId: number;
  attendUserIds: number[];
}
