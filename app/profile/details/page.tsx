import { getCurrentUser } from '@/lib/session';
import { getPersonalInformationById } from '@/services/PersonalInformation';
import DetailsForm from './components/DetailsForm';

const fetchUserData = async (sub: string, token: string) => {
  const resp = await getPersonalInformationById(sub, token);
  const data = await resp.json();
  return data;
};

const page = async () => {
  const userCreds = await getCurrentUser();

  const { item: personalInformation } = await fetchUserData(
    userCreds.user.id,
    userCreds.token!
  );

  const userData = {
    name: userCreds.user.given_name,
    lastname: userCreds.user.family_name,
    email: userCreds.user.email,
    ...personalInformation,
  };

  return (
    <div className="w-full h-full p-0 sm:px-4">
      <DetailsForm userData={userData} />
    </div>
  );
};

export default page;
