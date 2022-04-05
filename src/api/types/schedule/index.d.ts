type ISchedule = IBase<{
  id: number;
  course: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  url: string;
  borderColor: string;
  checkday: boolean;
  daydisable: boolean;
  subject: string;
  studyid: number;
  room: string;
  teacher: string;
  school: string;
}>;
