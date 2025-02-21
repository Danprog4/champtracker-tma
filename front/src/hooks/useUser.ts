import { getUser } from "@/api/challenge";
import { User } from "@back-types";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data } = useSuspenseQuery<{ user: User }>({
    queryKey: [getUser.name],
    queryFn: getUser,
  });
  return { user: data.user };
};
