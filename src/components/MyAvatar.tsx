// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';
import devStore from '@/store/dev';
import { useSnapshot } from 'valtio';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const devState = useSnapshot(devStore);

  return (
    <Avatar
      src={devState.user.avatar}
      alt={`${devState.user.first_name} ${devState.user.last_name}`}
      color={
        devState.user?.avatar ? 'default' : createAvatar(`${devState.user.first_name || ''}`).color
      }
      {...other}
    >
      {createAvatar(`${devState.user.first_name || ''}`).name}
    </Avatar>
  );
}
