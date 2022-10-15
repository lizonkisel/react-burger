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

export type TOrder = {
  readonly _id: string;
  readonly ingredients: ReadonlyArray<string | null>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number
}

export type TAllIngredientsResponse = {
  success: boolean;
  data: ReadonlyArray<TIngredient>
};

export type TLoginResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string
};

export type TGetOrderResponse = {
  success: boolean;
  order: TOrder
};

export type TRegistrationResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string
};

export type TWsMessageData = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number
};
