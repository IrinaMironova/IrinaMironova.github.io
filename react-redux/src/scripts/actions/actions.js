export const addNews = news => ({ type: 'APP_ADD', payload: news });
export const updateNews = news => ({ type: 'APP_UPDATE', payload: news });
export const removeNews = newsId => ({ type: 'APP_REMOVE', payload: newsId });
