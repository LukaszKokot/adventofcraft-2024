export enum ToyType {
  EDUCATIONAL = "Educational",
  FUN = "Fun",
  CREATIVE = "Creative",
}

export const MAX_TOY_TYPE_EDUCATIONAL_PERCENTAGE = 0.25;
export const MAX_TOY_TYPE_FUN_PERCENTAGE = 0.3;
export const MAX_TOY_TYPE_CREATIVE_PERCENTAGE = 0.2;

export const ToyBalance = new Map<ToyType, number>([
  [ToyType.EDUCATIONAL, MAX_TOY_TYPE_EDUCATIONAL_PERCENTAGE],
  [ToyType.FUN, MAX_TOY_TYPE_FUN_PERCENTAGE],
  [ToyType.CREATIVE, MAX_TOY_TYPE_CREATIVE_PERCENTAGE],
]);
