const getToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getToken;
