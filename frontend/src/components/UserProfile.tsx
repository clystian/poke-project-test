import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { IUser } from '../types';

interface UserProfileProps {
  user: IUser;
  onLogout?: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <Box className="md:w-1/3 flex flex-col items-center md:items-start">
      <Image borderRadius="full" boxSize="100px" src={user.avatar || 'https://placekitten.com/100/100'} alt="Avatar" mb={4} />
      <Heading mb={2} className="text-xl text-red-600">{user.username}</Heading>
      <Text className="text-gray-500">{user.email}</Text>
      <button className="mt-4 self-center md:self-start bg-red-600 text-white py-2 px-4 rounded"
        onClick={() => onLogout && onLogout()}>
        Logout
      </button>
    </Box>
  );
};

export default UserProfile;
