const initState = {
    authors: [],
    isLoaded: false,
};

export const authorReducer = (state = initState, action) => {
    switch (action.type) {
        case "loadAuthors":
            return { ...state, isLoaded: true, authors: action.payload };
        case "deleteAuthor":
            return {
                ...state,
                authors: state.authors.filter((a) => a.id != action.payload),
            };
        case "updateAuthor":
            return {
                ...state,
                authors: action.payload,
            };
        case "createAuthor":
            return {
                ...state,
                authors: [...state.authors, action.payload],
            };
        default:
            return state;
    }
};