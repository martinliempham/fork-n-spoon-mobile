const get = function(url) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response))
        }
        else {
          reject(Error(xhr.statusText));
        }
      };

      xhr.onerror = function() {
        reject(Error('Connection error'));
      };

      xhr.send();
    }
  );
};

export default get;
