function getFullApiPath(path: string): string {
  const isDevEnvironment = process.env.NODE_ENV === 'development';

  if (isDevEnvironment) {
    return `http://localhost:3000/api${path}`;
  } else {
    return `https://byjoelthompson-api/api${path}`; // temporary, may need to update
  }
}

export default getFullApiPath;