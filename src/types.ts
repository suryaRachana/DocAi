export interface UserProfile {
  age: number;
  income: number;
  occupation: string;
  location: string;
}

export interface Scheme {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibilityExplanation: string;
  applicationSteps: string[];
  benefits: string;
}
