
const baseUrl = 'http://localhost:5000/api'; // Replace 5000 with your actual server port

// Register user
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
      // Save the token to use in future requests (e.g., product retrieval)
      localStorage.setItem('token', data.token);
      // Reload the page to fetch and display available products
      location.reload();
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Logout user
function logoutUser() {
    // Remove the token from local storage
    localStorage.removeItem('token');
  
    // Clear the displayed user information
    const loggedInUser = document.getElementById('loggedInUser');
    loggedInUser.innerHTML = '';
  
    // Optionally, redirect the user to the login page or perform any other action
  }


// Fetch and display available products
async function displayProducts() {
  try {
    // Get token from local storage (assuming you saved it after login)
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

// Load available products when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
