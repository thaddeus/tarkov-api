import graphiql from '../handlers/graphiql.mjs';
import graphQLOptions from './graphql-options.mjs';

const usePaths = [
    '/',
];

export default function usePlayground() {
    return {
        async onRequest({ url, endResponse }) {
            if (!usePaths.includes(url.pathname)) {
                return;
            }
        
            endResponse(graphiql(graphQLOptions));
        },
    }
}