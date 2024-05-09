export const initialState = {
  status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user:  {
    uid: '1234567890abcde',
    name: 'Emmanuel Valentin',
  },
  errorMessage: undefined,
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
}

