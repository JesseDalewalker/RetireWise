export type TermCard = {
  _id: string;
  definitionID: string;
  wordName: string;
  isFlipped: boolean;
  state: 'default' | 'matched';
};
export type DefinitionCard = {
  _id: string;
  definition: string;
  isFlipped: boolean;
  state: 'default' | 'matched';
};
