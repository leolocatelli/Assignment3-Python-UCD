
// Initialize user quotes from localStorage or set default values

let usersQuotes = JSON.parse(localStorage.getItem('usersQuotes')) || [
    {
        user: 'leo',
        name: 'Leonardo Locatelli',
        password: '123',
    },
    {
        user: 'jane_smith',
        name: 'Jane Smith',
        password: 'securepass',
    },
    {
        user: 'alex_williams',
        name: 'Alex Williams',
        password: 'mypassword',
    },
];


// Initialize post quotes from localStorage or set default values

let postsQuotes = JSON.parse(localStorage.getItem('postsQuotes')) || [
    {
        texto: "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
        user: "Traveler365",


    },
    {
        texto: "Stars can't shine without darkness.",
        user: "StarryNight",
        following: false,


    },
    {
        texto: "The best way to predict the future is to create it.",
        user: "FutureBuilder",


    },
    {
        texto: "Happiness is not something ready made. It comes from your own actions.",
        user: "ActionHappiness",


    },
    {
        texto: "In the end, we only regret the chances we didn't take.",
        user: "RiskTaker",
        following: false,


    },
    {
        texto: "The only limit to our realization of tomorrow will be our doubts of today.",
        user: "BelieveInYourself",


    },
    {
        texto: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        user: "CourageousHeart",
        following: false,


    },
    {
        texto: "You miss 100% of the shots you don’t take.",
        user: "ShotTaker",


    }
];

// Event listener for DOM content loaded

document.addEventListener('DOMContentLoaded', function () {

    // Event listener for click events
    document.addEventListener('click', function (event) {
        const clickedElement = event.target;

        // Check if the clicked element is an open quote button
        if (clickedElement.classList.contains('button-interaction-open-quote')) {
            handleOpenQuoteClick(clickedElement);
        }
        // Check if the clicked element is a close quote button
        if (clickedElement.classList.contains('button-interaction-close-quote')) {
            handleCloseQuoteClick(clickedElement);
        }
    });
    // Function to handle open quote button click
    function handleOpenQuoteClick(element) {
        const openInteraction = element;
        const closeInteraction = element.parentElement.querySelector('.button-interaction-close-quote');

        let isOpenSelected = openInteraction.classList.contains('quote-selected');
        let isCloseSelected = closeInteraction.classList.contains('quote-selected');
        // If the open quote button is not selected
        if (!isOpenSelected) {
            openInteraction.src = 'static/images/open-quote-filled.png';
            openInteraction.classList.add('quote-selected');
            console.log("open selected");
            // Deselect the close quote button if it is selected
            if (isCloseSelected) {
                closeInteraction.src = 'static/images/close-quote-empty.png';
                closeInteraction.classList.remove('quote-selected');
                isCloseSelected = false;
            }
            // Deselect the open quote button
        } else {
            openInteraction.src = 'static/images/open-quote-empty.png';
            openInteraction.classList.remove('quote-selected');
            console.log("open deselected");
        }
    }
    // Function to handle close quote button click
    function handleCloseQuoteClick(element) {
        const closeInteraction = element;
        const openInteraction = element.parentElement.querySelector('.button-interaction-open-quote');

        let isOpenSelected = openInteraction.classList.contains('quote-selected');
        let isCloseSelected = closeInteraction.classList.contains('quote-selected');
        // If the close quote button is not selected
        if (!isCloseSelected) {
            closeInteraction.src = 'static/images/close-quote-filled.png';
            closeInteraction.classList.add('quote-selected');
            console.log("close selected");
            // Deselect the open quote button if it is selected
            if (isOpenSelected) {
                openInteraction.src = 'static/images/open-quote-empty.png';
                openInteraction.classList.remove('quote-selected');
                isOpenSelected = false;
            }
            // Deselect the close quote button

        } else {
            closeInteraction.src = 'static/images/close-quote-empty.png';
            closeInteraction.classList.remove('quote-selected');
            console.log("close deselected");
        }
    }
});




// Event listener for DOM content loaded to handle login

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-button');
    const errorMessage = document.getElementById('error-message');
    // Event listener for login button click
    loginButton.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Find the user with the provided username and password
        const user = usersQuotes.find(user => user.user === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            window.location.href = 'feed';
        }
    });
});









document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.querySelector('.register');
    const errorMessage = document.getElementById('error-message');

    registerButton.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match. Please try again.';
            return;
        }

        const existingUser = usersQuotes.find(user => user.user === username);
        if (existingUser) {
            errorMessage.textContent = 'Username already exists. Please choose a different one.';
            return;
        }
        // Create a new user object and add it to the usersQuotes array
        const newUser = {
            user: username,
            name: name,
            password: password,
            following: []
        };

        usersQuotes.push(newUser);

        localStorage.setItem('usersQuotes', JSON.stringify(usersQuotes));

        window.location.href = "login";
    });
});




// Event listener for DOM content loaded to display welcome text for logged-in user
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser);

    if (loggedInUser) {
        const welcomeText = document.querySelector('.welcome-text');
        welcomeText.textContent = `Hello ${loggedInUser.name}, what do you want to quote today?`;
    }
});
// Event listener for DOM content loaded to handle new quote posts
document.addEventListener('DOMContentLoaded', function () {
    const quoteButton = document.querySelector('.quote-button');

    quoteButton.addEventListener('click', function () {
        const textArea = document.querySelector('.feed-new-text');
        const newText = textArea.value.trim();

        if (newText !== '') {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            let postsQuotes = JSON.parse(localStorage.getItem('postsQuotes')) || [];

            const newPost = {
                texto: newText,
                user: loggedInUser.user,
                following: true,
                openQuotes: 0,
                closeQuotes: 0,
            };

            postsQuotes.unshift(newPost);

            localStorage.setItem('postsQuotes', JSON.stringify(postsQuotes));

            textArea.value = '';

            renderFeed(postsQuotes);
        }
    });
    // Function to render the feed
    function renderFeed(posts) {
        const feedContainer = document.querySelector('.feed-others-posts');
        feedContainer.innerHTML = '';
        // Create and append post elements for each post in the posts array
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('block-text');

            postElement.innerHTML = `
             <div class="feed-others-posts">
                <div class="block-text">
                <div class="logo-header-holder">
                    <img src="static/images/logo_quote.png" alt="quote logo" class="quote_logo_feed">
                </div>
                <p class="post-para">${post.texto}</p>
                <div class="author-following">
                    <p>@${post.user}</p>
                <p class="follow-button" onclick="toggleFollow()">Follow</p>
                </div>
                <div class="buttons-interaction-quote">
                    <img src="static/images/open-quote-empty.png" alt="open quote" class="button-interaction-open-quote">
                    <img src="static/images/close-quote-empty.png" alt="close quote" class="button-interaction-close-quote">
                </div>
                   </div>
            </div>
                
            `;

            feedContainer.appendChild(postElement);
        });
    }

    let postsQuotes = JSON.parse(localStorage.getItem('postsQuotes')) || [];
    renderFeed(postsQuotes);
});

// Event listener for DOM content loaded to handle follow button clicks
document.addEventListener('DOMContentLoaded', function () {
    const followButtons = document.querySelectorAll('.follow-button');
    // Add event listener to each follow button
    followButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('following');
            // Add event listener to each follow button
            if (button.classList.contains('following')) {
                button.textContent = 'Following';
            } else {
                button.textContent = 'Follow';
            }
        });
    });
});





