import { MentalHealthQuestionFields } from '@/types';
import FormField from '../../components/FormField';

const MentalHealthQuestions = ({
  historyOfAbuse,
  mentalHealthMedications,
  psychiatricIssues,
}: MentalHealthQuestionFields) => {
  return (
    <div className="w-[99%] m-auto bg-white shadow sm:p-8">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <FormField
              title="Psychiatric Issues"
              state={psychiatricIssues.state}
              setState={psychiatricIssues.setState}
              description="Psychiatric Issues. Include Sleep Disorders"
              placeholder="Anxiety"
            />
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Substance Abuse"
              state={historyOfAbuse.state}
              setState={historyOfAbuse.setState}
              description="History of Substance Abuse or Addiction"
              placeholder=" "
            />
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Mental Health Medications"
              state={mentalHealthMedications.state}
              setState={mentalHealthMedications.setState}
              description="Mental Health Medications (if any)"
              placeholder="Rivotril"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MentalHealthQuestions;
