export type TermCard = {
  id: string;
  definitionID: string;
  wordName: string;
  isFlipped: boolean;
  state: 'default' | 'matched';
};
export type DefinitionCard = {
  id: string;
  definition: string;
  isFlipped: boolean;
  state: 'default' | 'matched';
};
