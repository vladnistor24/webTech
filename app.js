
const baseUrl = 'http://localhost:5000/api'; 

async function registerUser() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert('User registered successfully!');
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


async function loginUser() {
  console.log("testing");
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

const data = await fetch('./AntiFoodWasteApp.groups.json').then(response => {
   return response.json();
})

data.push({name: 'testing'});

console.log(data)

const data2 = await fetch('./AntiFoodWasteApp.groups.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

console.log('data2', data2);


  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Login successful! Token: ${data.token}`);
      localStorage.setItem('token', data.token);
      location.reload();
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function logoutUser() {
    localStorage.removeItem('token');
    const loggedInUser = document.getElementById('loggedInUser');
    loggedInUser.innerHTML = '';
  }


async function displayProducts() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseUrl}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - ${product.category}`;
      productList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
