export function formatDateToDayMonthYear(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}




export type BlogProps = {
  blog: {
      id: string;
      title: string;
      description: string;
      createdAt: string;
      coverImage?: string;
      author?: {
          name: string;
          profileImage?: string;
      };
      topic?: string;
  };
}