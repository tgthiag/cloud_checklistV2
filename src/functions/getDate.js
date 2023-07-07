export const getCurrentDate = () => {
  let dt = new Date()
  let date = dt.getDate();
  let month = dt.getMonth() + 1;
  let year = dt.getFullYear();

  return year + "-" + month + "-" + date;
};