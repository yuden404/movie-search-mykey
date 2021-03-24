import axios from 'axios';
const omdbURI = 'http://www.omdbapi.com/';
const apiKey = '157f34ed';

export async function searchMovieByName (movieName, page) {
    const regex = new RegExp(/\((year:\s*[0-9]{4}\))/);

    let year = regex.exec(movieName);
    if (year) {
        movieName = movieName.replace(year[0], "");
        year = year[0].match(/\d+/)[0];
    }
    try {
        const res = await axios.get(`${omdbURI}?s=${movieName.trim()}&apikey=${apiKey}${year ? `&y=${year}`: ''}&page=${page}`);
        return res;
    } catch(e) {
        throw new Error(e);
    }
}
