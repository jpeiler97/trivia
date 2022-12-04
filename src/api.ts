export const getQuestions = (amt: number) => {
  return fetch(
    `https://opentdb.com/api.php?amount=${amt}&category=9&difficulty=medium&type=multiple&encode=url3986`
  ).then((res) => {
    return res.json();
  });
};
