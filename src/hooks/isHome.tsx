import { useEffect } from "react";
import { useAppSelector } from "./redux";

const useIsHome = () => {
  const { selectedNav } = useAppSelector((state: any) => state.navdata);

  return selectedNav === "Home";
};

export default useIsHome;
