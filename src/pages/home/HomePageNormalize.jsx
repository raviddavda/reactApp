const homePageNormalization = (dataFromServer, id) => {
  for (let user of dataFromServer) {
    user.likes = Boolean(user.likes.find((userId) => userId === id));
    console.log(user.likes);
  }
  return dataFromServer;
};
export default homePageNormalization;
