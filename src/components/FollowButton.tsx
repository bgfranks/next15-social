"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";
import { FollowerInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";

interface FollowerButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerButton({
  userId,
  initialState,
}: FollowerButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useFollowerInfo(userId, initialState);
  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
  });
  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
