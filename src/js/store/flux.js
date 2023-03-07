const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			person: [],

			planets: [],
			favorites: [],
			loading: true
		},
		actions: {
			getCharactersFetch: async () => {
				setStore({ loading: true })
				try {
					await fetch("https://www.swapi.tech/api/people/")
						.then(res => res.json())
						.then(data => {
							setStore({ characters: data.results })
							setStore({ loading: false })
						})
				} catch (error) {
					console.log('problem with fetch:' + error.message);
					setStore({ loading: false })
				}
			},

			getPlanetsFetch: async () => {
				setStore({ loading: true })
				try {
					await fetch("https://www.swapi.tech/api/planets/")
						.then(res => res.json())
						.then(data => {
							setStore({ planets: data.results })
							setStore({ loading: false })
						})
				} catch (error) {
					console.log('problem with fetch:' + error.message);
					setStore({ loading: false })
				}
			},

			addFavorite: async (item) => {
				setStore({
					favorites: [...getStore().favorites, item]
				})
			},

			removeFavorite: async (index) => {
				const favorites = getStore().favorites;
				console.log(favorites)
				const updateFavorites = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
				setStore({ favorites: updateFavorites });
			  }



		}
	};
};

export default getState;