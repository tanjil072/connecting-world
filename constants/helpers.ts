// Generate initials from username for avatar
export const getInitials = (username: string) => {
  if (!username) return "?";
  return (
    username
      .split(" ")
      .map((word) => word[0])
      .filter((char) => char)
      .join("")
      .toUpperCase()
      .slice(0, 2) || username.substring(0, 2).toUpperCase()
  );
};
