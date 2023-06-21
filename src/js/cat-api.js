const API_KEY =
  'live_LLOfWvOQROzdmcBGbAmEUMJtux608c3k51xLXh5kUnj1z3h6VE8QS2XmHBVo01w1';
const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  const END_POINT = '/breeds';
  const PARAMETRS = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}${END_POINT}?${PARAMETRS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  const PARAMETRS = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });
  return fetch(`${BASE_URL}${END_POINT}?${PARAMETRS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
