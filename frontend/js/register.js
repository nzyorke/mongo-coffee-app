

const server = 'http://localhost:3100';

const signupBtn = document.getElementById("signup-button");
const usernameInput = document.getElementById("name-input");
const passwordInput = document.getElementById("password-input");
const profileImgInput = document.getElementById("image-url-input");

signupBtn.onclick = function() {
    event.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;
    let profileImg = profileImgInput.value;

    // Testing if getting correct data from inputs
    // console.log(username, password, profileImg);

    $.ajax({
        url: `${server}/registerUser`,
        type: 'POST',
        data: {
            username: username,
            password: password,
            profile_img_url: profileImg
        },
        success: function(user) {
            if (user !== 'username exists') {
                console.log("nice you signed up");
                console.log(user);

                $.ajax({
                    url: `${server}/loginUser`,
                    type: 'POST',
                    data: {
                        username: usernameInput.value,
                        password: passwordInput.value
                    },
                    success: function(user) {
                        if(user == 'user not found') {
                            console.log('User not found. Please Register');
                        } else if (user == 'not authorised') {
                            console.log('Incorrect password.');
                        } else {
                            console.log('Logged in successfully. Logged in as:');
                            console.log(user);
                            // set the local storage (cookie) properties equal to the retrived user data
                            sessionStorage.setItem('userID', user._id);
                            sessionStorage.setItem('userName', user.username);
                            sessionStorage.setItem('profileImg', user.profile_img_url);
                            // redirect to the home page
                            document.location.href = 'index.html'
                        }// end of ifs
                    }, // end of success
                    error: function() {
                        console.log('error: cannot call api');
                        alert('unable to login - unable to call api');
                    }  // error
                }) // end of ajax
            } else {
                console.log('username taken already. Please try another name');
            } // else
            // if register is successful - log user in Ends
        }, // success
        error: function() {
            console.log('error: cannot call api');
        }//error
    }) // ajax post
} // end of signBtn onClick