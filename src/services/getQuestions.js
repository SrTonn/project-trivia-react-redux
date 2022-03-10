const getQuestions = async (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getQuestions;
