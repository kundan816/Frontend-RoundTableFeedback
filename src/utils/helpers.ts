export function formatMonthYear(monthYear: string): string {
    //  "2024-06" => "June 2024"
    try {
      const [year, month] = monthYear.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString("default", { month: "long", year: "numeric" });
    } catch (error) {
      console.error("Error formatting month-year:", error);
      return monthYear;
    }
  }
  