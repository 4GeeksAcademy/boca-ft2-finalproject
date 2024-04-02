const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			spotifyToken: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Function Refreshes On Load
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
						setStore({ spotifyToken: newToken })
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
