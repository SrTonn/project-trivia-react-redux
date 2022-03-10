import md5 from 'crypto-js/md5';

const getGravatarPicture = (email) => {
  const gravatarEmail = md5(email).toString();
  return `https://www.gravatar.com/avatar/${gravatarEmail}`;
};

export default getGravatarPicture;
