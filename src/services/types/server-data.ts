export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly uId?: string
};

export type TIngredientWithCount = {
  itemId: string;
  count: number
};


export type TUser = {
  readonly email: string;
  readonly name: string
};
