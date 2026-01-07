function NewsOutput({ news }) {
    return (
        <>
            <img src={news.image} alt="image" />
            <h4>{news.title}</h4>
            <p>{news.text}</p>
        </>
    )
}

export default NewsOutput