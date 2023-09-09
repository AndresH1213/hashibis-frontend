export interface MedicalUserData {
  allergies?: string;
  chronicIllnesses?: string;
  prescriptionMedication?: string;
  previousExperienceWithTHC?: string;
  frequenceOfUsage?: string;
  effectsExperienced?: string;
  psychiatricIssues?: string;
  historyOfAbuse?: string;
  mentalHealthMedications?: string;
}

export interface MedicalQuestionFields {
  allergies: {
    state: string;
    setState: (value: string) => void;
  };
  chronicIllnesses: {
    state: string;
    setState: (value: string) => void;
  };
  prescriptionMedication: {
    state: string;
    setState: (value: string) => void;
  };
}

export interface CannabisUsageQuestionFields {
  previousExperienceWithTHC: {
    state: string;
    setState: (value: string) => void;
  };
  frequenceOfUsage: {
    state: string;
    setState: (value: string) => void;
  };
  effectsExperienced: {
    state: string;
    setState: (value: string) => void;
  };
}

export interface MentalHealthQuestionFields {
  psychiatricIssues: {
    state: string;
    setState: (value: string) => void;
  };
  historyOfAbuse: {
    state: string;
    setState: (value: string) => void;
  };
  mentalHealthMedications: {
    state: string;
    setState: (value: string) => void;
  };
}
