const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const toDateString = dateString => {
  const date = new Date(dateString);

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default toDateString;
