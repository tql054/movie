const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '55e73122133abeeeb8be53b2b99a48f0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;