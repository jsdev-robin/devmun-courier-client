export const formatStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    failed: 'Failed',
    booked: 'Booked',
  };
  return statusMap[status] || status;
};
