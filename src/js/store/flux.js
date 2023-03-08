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
				const { favorites } = getStore();
				const itemExists = favorites.find(favorite => favorite.name === item.name);
				
				if (!itemExists) {
				  setStore({
					favorites: [...favorites, item]
				  });
				} else {
				  alert("Este favorito ya ha sido agregado");
				}
			  },

			  removeFavorite: async (index) => {
				const favorites = getStore().favorites;
				const updateFavorites = favorites.filter((_, i) => i !== index);
				setStore({ favorites: updateFavorites });
			  }



		}
	};
};

export default getState;