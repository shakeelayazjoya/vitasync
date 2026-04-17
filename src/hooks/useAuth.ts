import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { selectUser, selectIsAuthenticated, selectUserRole, logoutUser } from "@/redux/slices/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);

  const logout = () => {
    dispatch(logoutUser());
  };

  return { user, isAuthenticated, role, logout };
};
