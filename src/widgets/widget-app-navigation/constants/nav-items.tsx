import { PATHS } from '@pages/paths';
import { TradingSvg, RocketSvg, FriendsSvg } from '../assets';

export const NAVIGATION_ITEMS = [
  {
    label: 'Earn',
    icon: <TradingSvg />,
    path: PATHS.earn,
  },
  {
    label: 'Boost',
    icon: <RocketSvg />,
    path: PATHS.boost,
  },
  {
    label: 'Friends',
    icon: <FriendsSvg />,
    path: PATHS.friends,
  },
  // {
  //   label: 'Companies',
  //   icons: <Business />,
  //   path: PATHS.companies,
  // },
];
