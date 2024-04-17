const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			friendRequests: [],
			friends: [],
			playingSongUri: null,
			userCordinates: null,
			spotifyToken: null,
			spotifyPlayToken: null,
			userSearchBarInput: "",
			user: null,
			playlists: [],
			auth_url: `https://accounts.spotify.com/authorize?client_id=5eedb8285f214e62985fddba0f324895&response_type=code&redirect_uri=${process.env.REDIRECT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
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

			getUserInfo: () => {
				var token = sessionStorage.getItem('token')
				const opts = {
					method: 'GET',
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}
				if (token) {
					fetch(process.env.BACKEND_URL + "/getuser", opts)
						.then(resp => resp.json())
						.then(data => setStore({ user: data }))
				}
			},
			setPlayingSongUri: (uri, artistId, songID, artistName) => {
				const store = getStore()

				setStore({ playingSongUri: uri });

				fetch((`https://api.spotify.com/v1/artists/${artistId}`), {
					headers: {
						'Authorization': `Bearer ${store.spotifyToken}`
					}
				})
					.then(res => res.json())
					.then(data => {
						console.log(data)
						fetch((process.env.BACKEND_URL + '/trackgenre'), {
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								"uid": store.user.uid,
								"genre": data.genres
							})
						})
							.then(res => res.json())
							.then(data => console.log(data))

					})

				fetch((process.env.BACKEND_URL + '/trackartist'), {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"uid": store.user.uid,
						"artist_id": artistId,
						"artist_name": artistName
					})
				}
				).then(res => res.json())
					.then(data => console.log(data))


				fetch((process.env.BACKEND_URL + '/tracksong'), {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"uid": store.user.uid,
						"song_id": songID
					})
					

				})
					.then(res => res.json())
					.then(data => console.log(data))
			},


			//Function Refreshes On Load
			setUserFriends:()=>{
				fetch(process.env.BACKEND_URL + `/getprofile/${sessionStorage.getItem('uid')}`)
				.then((response)=>response.json())
				.then((data)=>{
					
					let requestedArray = data.friends.filter((friend)=>friend.request_status === "requested")
					let tempFiller =[]
					console.log(requestedArray);
					requestedArray.map((element)=>{
						console.log(element.friend_id);
						fetch(process.env.BACKEND_URL + `/getprofile/${element.friend_id}`)
						.then((response)=>response.json())
						.then((data)=>{
							tempFiller.push(data)
							console.log(data);
						})
					})
					setStore({friendRequests:tempFiller})
					return data
				}).then((data)=>{
					(setStore({friends:data.friends}))
					let requestedArray = data.friends.filter((friend)=>friend.request_status === "friend")
					let tempFiller =[]
					console.log(requestedArray);
					requestedArray.map((element)=>{
						console.log(element.friend_id);
						fetch(process.env.BACKEND_URL + `/getprofile/${element.friend_id}`)
						.then((response)=>response.json())
						.then((data)=>{
							tempFiller.push(data)
							console.log(data);
						})
					})
					(setStore({friends:tempFiller}))
				})

			},

			setUser: (data) => {
				setStore({ user: data })
			},

			userSearchBarInput: (characters) => {
				setStore({ userSearchBarInput: characters })
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

			setPlaylists: (plstArray) => {
				setStore({ playlists: plstArray });
			},

			getPlaylists: (uid) => {
				fetch(process.env.BACKEND_URL + '/get/playlists/' + uid)
					.then(resp => resp.json())
					.then(playlists => setStore({ playlists: playlists }))
					.catch(err => console.log(err))
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

				fetch(process.env.BACKEND_URL + '/login', opts)
					.then(resp => {
						if (resp.ok) {
							return resp.json()
						}
						else {
							alert("Incorrect Username or Password")
						}
					})
					.then(data => {
						sessionStorage.setItem("token", data.access_token); sessionStorage.setItem("uid", data.user.uid); setStore({ user: data.user });
						getActions().getPlaylists(data.user.uid);
					})
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
						redirect_uri: process.env.REDIRECT_URL,
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
			},

			getMessage: async () => {
				// try {
				// 	// fetching data from the backend
				// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				// 	const data = await resp.json()
				// 	setStore({ message: data.message })
				// 	// don't forget to return something, that is how the async resolves
				// 	return data;
				// } catch (error) {
				// 	console.log("Error loading message from backend", error)
				// }
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
