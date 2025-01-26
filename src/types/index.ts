export interface Position {
  title: string;
  category: string;
  duties: string[];
  reporting: string;
  meetings: string[];
}

export interface Letter {
  recipientName: string;
  position: string;
  startDate: string;
  endDate: string;
  referenceNumber: string;
  customDuties?: string[];
}

export interface LetterTemplateProps {
  letter: Letter;
  position: Position;
}