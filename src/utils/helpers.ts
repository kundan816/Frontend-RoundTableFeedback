export function formatMonthYear(monthYear: string) {
    // e.g. "2024-06" => "June 2024"
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  