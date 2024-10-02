export const reader = (file) => {
  const reader = new FileReader();
    console.log('post-reader');
    reader.onload = function (e) {
      try {
        console.log('inside-reader');
        const jsonData = JSON.parse(file);
        console.log(jsonData);
        emit('file-dropped', jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        emit('file-dropped-error', error);
      }
      reader.close();
    };
    reader.onerror = function (error) {
      console.error('File reading error:', error);
      emit('file-read-error', error);
    };
}

