

function NewsOutput (news){
    return (
        <>
        <img src={news.image} alt="image" />
        <h1>{news.title}</h1>
        <p>{news.text}</p>
        </>

    )
}

export default NewsOutput;