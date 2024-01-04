import { Core } from 'src/common/entities/core.entity';

export interface Post extends Core {
  title: string;
  content: string;
}
