// Function that convert a file to base54
export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // When the file is loaded
    reader.onload = () => resolve(reader.result as string);
    // If an error occured
    reader.onerror = (error) => reject(error);
  });
