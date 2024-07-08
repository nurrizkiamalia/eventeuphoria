// utils/formatDate.ts
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      (day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10
    ];
    return formattedDate.replace(/^\d+/, `${day}${suffix}`);
  };
  