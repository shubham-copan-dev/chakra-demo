import axiosIntercept from "..";
import { Props } from "../interface";

export const note = async (props: Props) => {
  try {
    const url = `bff/api/v1/notes/${props?.url ?? ''}`;
    const response = await axiosIntercept({
      ...props,
      url,
    });
    return response;
   
  } catch (error) {
    console.log("error from note", error);
    throw error;
  }
};