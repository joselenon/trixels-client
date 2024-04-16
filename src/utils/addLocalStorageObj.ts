const localStorageKeys = { timers: 'timers' };

const saveDataInLocalStorage = (key: string, data: any) => {
  try {
    const dataString = JSON.stringify(data);

    localStorage.setItem(key, dataString);

    console.log('Dados do usuário salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados do usuário:', error);
  }
};

const getDataFromLocalStorage = (key: string) => {
  try {
    const dataString = localStorage.getItem(key);

    const data = dataString ? JSON.parse(dataString) : null;
    return data;
  } catch (error) {
    console.error('Erro ao recuperar os dados do usuário:', error);
    return null;
  }
};

export { getDataFromLocalStorage, localStorageKeys, saveDataInLocalStorage };
