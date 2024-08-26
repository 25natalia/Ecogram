document.addEventListener('DOMContentLoaded', () => {
	const saveButton = document.querySelector('.save');
	const tituloInput = document.getElementById('titulo');
	const imagenInput = document.getElementById('imagen');
	const textInput = document.getElementById('text');
	const postsContainer = document.querySelector('.posts');
	const loginButton = document.querySelector('.login');
	const registerButton = document.querySelector('.register');
	const returnButton = document.querySelector('.return');
	const userInput = document.getElementById('user');
	const passwordInput = document.getElementById('password');
	const nameInput = document.getElementById('name');

	const loadPosts = () => {
		const posts = JSON.parse(localStorage.getItem('posts')) || [];
		postsContainer.innerHTML = '';
		posts.forEach((post) => {
			const postElement = document.createElement('div');
			postElement.classList.add('post-card');

			const imageUrl = post.imagen ? post.imagen : 'placeholder.jpg';

			postElement.innerHTML = `
				<div class="post-content">
					<h2>${post.titulo}</h2>
					<img src="${imageUrl}" alt="${post.titulo}" class="post-image" />
					<p>${post.text}</p>
				</div>
			`;
			postsContainer.appendChild(postElement);
		});
	};

	registerButton?.addEventListener('click', () => {
		const user = userInput.value.trim();
		const password = passwordInput.value.trim();
		const name = nameInput.value.trim();

		if (user && password && name) {
			localStorage.setItem('user', user);
			localStorage.setItem('password', password);
			localStorage.setItem('name', name);
			alert('Registration successful!');
			window.location.href = 'index.html';
		} else {
			alert('Please fill in all fields');
		}
	});

	loginButton?.addEventListener('click', () => {
		const enteredUser = userInput.value.trim();
		const enteredPassword = passwordInput.value.trim();
		const storedUser = localStorage.getItem('user');
		const storedPassword = localStorage.getItem('password');

		if (enteredUser === storedUser && enteredPassword === storedPassword) {
			alert('Login successful!');
			window.location.href = 'post.html';
		} else {
			alert('Invalid username or password');
		}
	});

	returnButton?.addEventListener('click', () => {
		window.location.href = 'index.html';
	});

	saveButton?.addEventListener('click', () => {
		const titulo = tituloInput.value.trim();
		const imagen = imagenInput.value.trim();
		const text = textInput.value.trim();

		if (titulo && imagen && text) {
			const posts = JSON.parse(localStorage.getItem('posts')) || [];
			posts.push({ titulo, imagen, text });
			localStorage.setItem('posts', JSON.stringify(posts));
			tituloInput.value = '';
			imagenInput.value = '';
			textInput.value = '';
			loadPosts();
		} else {
			alert('Please fill in all fields');
		}
	});

	if (postsContainer) {
		loadPosts();
	}
});
