import './card.scss';
import {useState} from 'react';
import classNames from 'classnames';
import {LazyLoadImage} from 'react-lazy-load-image-component';
function Card({movie}) {
    const {Title, Year, Type, Poster, imdbID} = movie;
    const [rotate, setRotate] = useState(false);
    const hasPoster = !(Poster === 'N/A');
    const renderPoster = (Poster) => {
        if (!hasPoster) {
            return <div className='poster-not-available'>
                Poster Not Available
            </div>;
        }
        return <LazyLoadImage src={Poster} alt={`poster of the movie ${Title}`}></LazyLoadImage>;
    }
    const rotateCard = (rotate) => {
        setRotate(rotate);
    }
    return (<div className={classNames("movie-card", {rotate})} onClick={() => rotateCard(!rotate)}>
        <div className="movie-card__side movie-card__side--front">
            <div className="movie-card__title" title={Title}>{Title}</div>
            <div className="movie-card__year">{Year}</div>
            {renderPoster(Poster)}
        </div>
        <div className="movie-card__side movie-card__side--back">
            <div className="movie-card__back-title">Title: {Title}</div>
            <div className="movie-card__back-release">Release: {Year}</div>
            <div className="movie-card__back-type">Type: {Type}</div>
            {
                hasPoster && <a onClick={(e)=>e.stopPropagation()} className="movie-card__back-poster-link" target="_blank" href={Poster}>Poster link</a>
            }
            <div className="movie-card__more-info">
                For more info visit: <a onClick={(e)=>e.stopPropagation()} target="_blank" href={`https://www.imdb.com/title/${imdbID}`}>IMDB</a>
            </div>
        </div>
    </div>);
}

export default Card;
