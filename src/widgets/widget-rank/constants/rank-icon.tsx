import StudentIcon from '../assets/student.svg';
import { Rank } from '@entities/game/types';

export const RANK_ICON: Record<Rank, string> = {
  boss: StudentIcon,
  student: StudentIcon,
};
