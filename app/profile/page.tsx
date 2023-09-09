import ProfilePage from './components/ProfilePage';
import { getCurrentUser } from '@/lib/session';
import { UserProfile } from '@/types';

const UserProfile = async () => {
  const { user, token } = await getCurrentUser();

  const userProfile = {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    liked_products: [],
  } as UserProfile;

  return <ProfilePage user={userProfile} token={token} />;
};

export default UserProfile;
