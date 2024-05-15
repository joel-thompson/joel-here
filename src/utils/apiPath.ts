function getFullApiPath(path: string): string {
  const isDevEnvironment = process.env.NODE_ENV === 'development';

  if (isDevEnvironment) {
    return `http://localhost:3000/api${path}`;
  } else {
    return `https://joel-here-node-0e4e48edd3fe.herokuapp.com/api${path}`; // temporary, may need to update
  }
}

export default getFullApiPath;