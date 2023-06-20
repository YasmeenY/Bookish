function BookBox({cover, title}) {
    return (
        <div className="Sign">
            <img src={cover}></img>
            <h2>{title}</h2>
        </div>
    )}

export default BookBox;