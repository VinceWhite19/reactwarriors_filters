export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "c318f405831fd1c5a2de805614a20601";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzE4ZjQwNTgzMWZkMWM1YTJkZTgwNTYxNGEyMDYwMSIsInN1YiI6IjVkNjkwMDFiYjdmYmJkMDAxMjEzNGYwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7iXDoau_LrdHwTGMI_9eqr8F8bGWVFFPt9pXdR0DL-c";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};
