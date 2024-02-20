export type WordCard = {
  id: number;
  wordName: string;
  isFlipped: boolean;
  state: 'default' | ' matched';
};
export type DefinitionCard = {
  id: number;
  definition: string;
  isFlipped: boolean;
  state: 'default' | 'matched';
};
