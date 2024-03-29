export type Ingredient = {
  readonly calories: number,
  readonly carbohydrates: number,
  readonly fat: number,
  readonly image: string,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly name: string,
  readonly price: number,
  readonly proteins: number,
  readonly type: string,
  readonly _id: string,
  readonly id?: string,
}

export type Order = {
  _id: string
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
}