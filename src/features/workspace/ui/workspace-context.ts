// import { ViewMode } from "../shared/types";
function reducer(state: {
    searchQuery: string;
    sortBy: string;
    viewMode: string;
    boards: any[]
}, action: {
    type: 'SET_SEARCH_QUERY' | 'SET_SORT_BY' | 'SET_VIEW_MODE';
    payload: any;
}) {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload
            }
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.payload
            }
        case 'SET_VIEW_MODE':
            return {
                ...state,
                viewMode: action.payload
            }
        default:
            return state
    }
}

// export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
//     const [state, dispatch] = useReducer(reducer, {
//         searchQuery: '',
//         sortBy: 'name',
//         viewMode: 'grid',
//         boards: []
//     })

//     return (
//         <WorkspaceContext></WorkspaceContext>
//     )
// }