import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en calendarApi', () => {
  test('Debe tener la configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('Debe de tener el header x-token en todas las peticiones', async () => {
    const keyToken = 'token';
    const token = 'token¿TeSt-124';

    localStorage.setItem(keyToken, token);

    const res = await calendarApi
      .get('/auth')
      .then((res) => res)
      .catch((res) => res);
    
    expect(res.config.headers['x-token']).toEqual(token);
  });
});
