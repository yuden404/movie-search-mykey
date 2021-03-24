import './card.scss';
import {LazyLoadImage} from 'react-lazy-load-image-component';
function Card({movie}) {
    const {Title, Year, Poster} = movie;
    const renderPoster = (Poster) => {
        if (Poster === 'N/A') {
            return <div className='poster-not-available'>
                Poster Not Available
            </div>;
        }
        return <LazyLoadImage src={Poster} alt={`poster of the movie ${Title}`}></LazyLoadImage>;
    }
    return (<div className="movie-card">
        <div className="movie-card__title" title={Title}>{Title}</div>
        <div className="movie-card__year">{Year}</div>
        {renderPoster(Poster)}
    </div>);
}

export default Card;
