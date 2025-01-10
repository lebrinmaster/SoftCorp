
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

export const adaptData = (data, names) => {
  const dataArray = [...data];
  const namesObject = { ...names };
  //Adapt data.json with Keys
  const adaptedArray = dataArray.map((item) => {
    //set Goods Category
    const productCategoryId = item.G;
    const adaptedItem = Object.create(item);
    adaptedItem!.G = namesObject[productCategoryId]!.G;
    adaptedItem!.T = namesObject[productCategoryId]!.B[item.T].N;
    adaptedItem!.P = item.P;
    return { ...adaptedItem };
  });
  //Map Data for accordion component
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
