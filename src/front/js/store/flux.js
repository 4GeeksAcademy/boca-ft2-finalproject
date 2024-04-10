const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			playingSongUri: null,
			userCordinates: null,
			spotifyToken: null,
			spotifyPlayToken: null,
			userSearchBarInput: "",
			user: null,
			auth_url: 'https://accounts.spotify.com/authorize?client_id=5eedb8285f214e62985fddba0f324895&response_type=code&redirect_uri=https://probable-winner-699xr9r9gvwxf5pwj-3000.app.github.dev/home&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
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

			setPlayingSongUri: (uri) => {
				setStore({ playingSongUri: uri })
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
			},
			handleLogIn: (usernameInput, passwordInput) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: usernameInput,
						password: passwordInput
					})
				}
				fetch("https://probable-winner-699xr9r9gvwxf5pwj-3001.app.github.dev/api/login", opts)
					.then(resp => {
						if (resp.ok) {
							return resp.json()
						}
						else {
							alert("Incorrect Username or Password")
						}
					})
					.then(data => sessionStorage.setItem("token", data.access_token))
					.then(data => setStore({ user: data }))
			},
			getToken: (code) => {
				const authOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': `Basic NWVlZGI4Mjg1ZjIxNGU2Mjk4NWZkZGJhMGYzMjQ4OTU6MGEyMDdhNGZiNjFjNDg3ZDhiOTg3Mjk4YjRkZDMzNDQ=`//encrypted client key
					},
					body: new URLSearchParams({
						code: code,
						redirect_uri: 'https://probable-winner-699xr9r9gvwxf5pwj-3000.app.github.dev/home',
						grant_type: 'authorization_code'
					})
				}
				fetch('https://accounts.spotify.com/api/token', authOptions)
					.then(response => response.json())
					.then(data => {
						setStore({ spotifyPlayToken: data.access_token });
						sessionStorage.setItem("spotifyPlayToken", data.access_token)
						// Handle the access token and other data as needed
					})
					.catch(error => {
						console.error('Error:', error);
						// Handle errors
					});
			}
		}
	};
};

export default getState;
