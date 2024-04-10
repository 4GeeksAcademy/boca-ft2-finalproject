const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userCordinates: null,
			spotifyToken: null,
			userSearchBarInput: "",
			userCode: "",
			redirectUri: 'https://accounts.spotify.com/authorize?client_id=5eedb8285f214e62985fddba0f324895&response_type=code&redirect_uri=https://friendly-parakeet-699q46x6g6rrc5j9j-3000.app.github.dev/home&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

		},
		actions: {
			// Use getActions to call a function within a fuction

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			convertZipToCoordinates: (userZip) => {
				fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userZip}&key=AIzaSyCsCQ-or4JxE_vQUmnX-FwVdn_YAK8a73I&=&=`)
					.then(response => {
						return response.json();
					})
					.then(res => {
						setStore({ userCordinates: res.results[0].geometry.location })
					})
			},


			//Function Refreshes On Load



			userSearchBarInput: (characters) => {
				setStore({ userSearchBarInput: characters })
			},

			setUserCode: (code) => {
				setStore({ userCode: code })
			},
			spotifyTokenRefresh: () => {
				const clientID = "5eedb8285f214e62985fddba0f324895"
				const clientSecret = "0a207a4fb61c487d8b987298b4dd3344"
				fetch((`https://accounts.spotify.com/api/token`), {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: (`grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`), // data can be a 'string' or an {object} which comes from somewhere further above in our application

				})
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
						return res.json();
					})
					.then(newToken => {
						setStore({ spotifyToken: newToken.access_token })
					})
			},



			

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
