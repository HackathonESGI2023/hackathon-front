import { ContractTypeEnum, contractTypeEnum } from "@schemas/contract.schema";

export const parseWheightCategory = (weight: string) => {
  //'A_HECKING_CHONKER' => 'A HECKING CHONKER'
  const weightCategory = weight.split("_").join(" ");
  const weightCategoryCapitalized = weightCategory
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return weightCategoryCapitalized;
};

export const textColor = (bgColor: string) => {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
};

export const contractTypeColor = (contractType: ContractTypeEnum) => {
  switch (contractType) {
    case contractTypeEnum.enum.CDI:
      return "#fc2646";
    case contractTypeEnum.enum.CDD:
      return "#2698fc";
    case contractTypeEnum.enum.FREELANCE:
      return "#fc6d26";
    case contractTypeEnum.enum.STAGIAIRE:
      return "#26fcae";
    case contractTypeEnum.enum.ALTERNANT:
      return "##fc26a7";
    default:
      return "#000000";
  }
};

export const mergeClassNames = (
  classNames: (string | null | undefined | false)[]
) => {
  return classNames.filter(Boolean).join(" ");
};
