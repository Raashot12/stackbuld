export interface CategoriesType {
  id: number;
  bgImg: {
    id: number;
    type: string | null;
    image: string;
  }[];
  isSale: boolean;
  name: string;
  amount: string;
  star: number;
  categories: string;
  modalCategories: string[];
  size: string[];
  color:
    | {
        type: string;
        image: string[];
      }[]
    | string[];
}
export type Article = {
  id: string;
  createdTime: string;
  fields: {
    Writer: string;
    Date: string;
    Image: string;
    Occupation: string;
    Time: string;
    Caption: string;
    Highlight: string;
    Content: string;
    Category: string;
  };
};
