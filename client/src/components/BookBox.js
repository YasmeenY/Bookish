function BookBox({cover, title}) {
    return (
        <div className="Sign">
            <img className='cover' src={cover} alt={title}></img>
            <h2>{title}</h2>
        </div>
    )}

export default BookBox;