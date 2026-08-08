export type Flashcard = {
  _id?: string;
  question: string;
  answer: string;
  successRate: number;
  lastReviewedAt: Date | undefined;
};
