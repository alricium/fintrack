export const formatEarningDateTime = (dateStr: string, createdAtStr: string) => {
    const datePart = new Date(dateStr);
    const timePart = new Date(createdAtStr);
  
    const month = String(datePart.getMonth() + 1).padStart(2, '0');
    const day = String(datePart.getDate()).padStart(2, '0');
    const year = datePart.getFullYear();
  
    const hours = String(timePart.getHours()).padStart(2, '0');
    const minutes = String(timePart.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes} ${month}/${day}/${year}`;
};
  
export const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
};
  
export const formatAmount = (amount: number) =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  