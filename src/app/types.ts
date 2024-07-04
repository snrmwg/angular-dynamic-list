export type ItemData = {
  type: string;
  data: string;
};

export type ItemDataB = ItemData & {
  type: 'typeB';

  anotherValue: number;
};
