import type { IResponse } from '@enthous/movie';

export const movieDelete = async (id: string): Promise<IResponse> => {
	const res = await fetch('http://localhost:3005/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: `
                mutation($data: RemoveMovieInput!){
                    removeMovie(data: $data) {
                        info
                        message
                        statusCode
                    }
                }
            `,
			variables: {
				data: { id }
			}
		})
	});

	const req = await res.json();

	return req.data.removeMovie;
};
