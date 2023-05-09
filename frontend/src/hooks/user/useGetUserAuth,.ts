import { useAppSelector } from "redux/store";

export const useGetUserAuth = () => {
  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const uid = user.id;
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  return { isLoggedCondition, uid };
};
