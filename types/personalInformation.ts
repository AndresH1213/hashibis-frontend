export interface PersonalUserData {
  name?: string;
  lastname?: string;
  birthday?: string;
  address?: string;
  country?: string;
  identification?: string;
  identificationType?: 'CC' | 'PA' | 'NIT';
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  email?: string;
  hasMedicalHistory?: boolean;
  lastOrder?: string;
  ordersNumber?: number;
}
