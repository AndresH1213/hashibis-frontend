import { MedicalQuestionFields } from '@/types';
import FormField from '../../components/FormField';

const MedicalHistoryQuestions = ({
  allergies,
  chronicIllnesses,
  prescriptionMedication,
}: MedicalQuestionFields) => {
  return (
    <div className="w-[99%] m-auto bg-white shadow sm:p-8">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <FormField
              title="Allergies"
              state={allergies.state}
              setState={allergies.setState}
              description="Record any allergies the user may have. (foods, environmental factors)"
              placeholder="Peach"
            />
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Chronic Illnesses"
              state={chronicIllnesses.state}
              setState={chronicIllnesses.setState}
              description="Record any chronic illnesses the user has"
              placeholder="Diabetes"
            />
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Prescription Medications"
              state={prescriptionMedication.state}
              setState={prescriptionMedication.setState}
              description="Medication user is taking. Current medications, dosage, frequency"
              placeholder="Insulin"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MedicalHistoryQuestions;
