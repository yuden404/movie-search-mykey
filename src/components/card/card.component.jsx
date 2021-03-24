import './card.scss';
function Card({movie}) {
    const {Title, Year, Poster} = movie;
    const renderPoster = (Poster) => {
        if (Poster === 'N/A') {
            return <div className='poster-not-available'>
                Poster Not Available
            </div>;
        }
        return <img srcSet={Poster} alt={`poster of the movie ${Title}`}/>;
    }
    return (
        <div className="movie-card">
            <div className="movie-card__title" title={Title}>{Title}</div>
            <div className="movie-card__year">{Year}</div>
            {renderPoster(Poster)}
        </div>
    );
}

export default Card;
