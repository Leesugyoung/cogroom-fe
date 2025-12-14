import { ApiResponse } from '@/types/api';

export interface DailyQuestionRequest {
  assignedQuestionId?: number;
  answerDate?: string;
}

export interface DailyQuestionResponse extends ApiResponse {
  result: {
    questionId: number;
    assignedQuestionId: number;
    question: string;
    answer?: string;
  };
}

export interface DailyAnswerRequest {
  assignedQuestionId: number;
  answer: string;
}

export interface DailyContent {
  assignedQuestionId?: number;
  questionId?: number;
  nickname?: string;
  imageUrl?: string;
  question: string;
  level: string;
  categories: string[];
  answer?: string;
  answeredAt?: string;
}

export interface DailyHasAnsweredResponse extends ApiResponse {
  result: {
    hasAnswered: boolean;
  };
}
