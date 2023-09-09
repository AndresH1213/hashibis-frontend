import { CustomMenu } from '@/components/common';
import FormField from '../../components/FormField';
import { CannabisUsageQuestionFields } from '@/types';

const CannabisUsageQuestions = ({
  previousExperienceWithTHC,
  effectsExperienced,
  frequenceOfUsage,
}: CannabisUsageQuestionFields) => {
  return (
    <div className="w-[99%] m-auto bg-white shadow sm:p-8">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <FormField
              title="Previous Experience"
              state={previousExperienceWithTHC.state}
              setState={previousExperienceWithTHC.setState}
              description="Previous Experience with Cannabis (if any)"
              placeholder=" "
            />
          </li>
          <li className="py-3 sm:py-4 flex">
            <div className="w-full">
              <p className="text-md font-semibold truncate ">Frequency</p>
              <p className="text-sm">
                Frequency of cannabis usage (occasional, regular, daily)
              </p>
            </div>
            <CustomMenu
              title=""
              state={frequenceOfUsage.state}
              setState={frequenceOfUsage.setState}
              filters={['ocassional', 'regular', 'daily']}
            />
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Effects Experienced"
              state={effectsExperienced.state}
              setState={effectsExperienced.setState}
              description="Any positive or negative effects experienced while consuming cannabis"
              placeholder="Sleepiness"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CannabisUsageQuestions;
