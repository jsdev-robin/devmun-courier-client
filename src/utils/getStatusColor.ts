export const getStatusClass = (status?: string) => {
  switch (status) {
    case 'booked':
      return 'bg-blue-100 text-blue-700 capitalize';
    case 'picked_up':
      return 'bg-purple-100 text-purple-700 capitalize';
    case 'in_transit':
      return 'bg-yellow-100 text-yellow-700 capitalize';
    case 'delivered':
      return 'bg-green-100 text-green-700 capitalize';
    case 'failed':
      return 'bg-red-100 text-red-700 capitalize';
    default:
      return 'bg-gray-100 text-gray-700 capitalize';
  }
};
