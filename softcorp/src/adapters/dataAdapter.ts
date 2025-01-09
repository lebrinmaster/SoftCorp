import dataJson from "../../data.json";
import namesJson from "../../names.json";

const dataArray: IData[] = dataJson.Value.Goods;
const namesArray = namesJson;

export interface IData {
  B: boolean;
  C: number;
  CV: any;
  G: number;
  P: number;
  Pl: any;
  T: number;
}
export interface IAdaptedData {
  B: boolean;
  C: number;
  CV: any;
  G: string;
  P: number;
  Pl: any;
  T: string;
}

const dataArrayAdapter = (): IAdaptedData[] => {
  const result: IAdaptedData[] = dataArray.map((item: IData) => {
    //set Goods Category
    const productCategoryId = item.G;
    const adaptedItem = Object.assign(item);
    adaptedItem!.G = namesArray[productCategoryId]!.G;
    adaptedItem!.T = namesArray[productCategoryId]!.B[item.T].N;
    return { ...adaptedItem } as IAdaptedData;
  });
  return result;
};

const adaptedArray = dataArrayAdapter();

export const shoppingCarouselAdapter = () => {
  let currentCategory = "";
  let index = 0;
  const result = {};
  for (let i = 0; i < adaptedArray.length; i++) {
    if (!currentCategory) {
      currentCategory = adaptedArray[i].G;
      result[index] = [adaptedArray[i]];
    } else {
      if (currentCategory === adaptedArray[i].G) {
        result[index].push(adaptedArray[i]);
      } else {
        index++;
        currentCategory = adaptedArray[i].G;
        result[index] = [adaptedArray[i]];
      }
    }
  }
  return result;
};
