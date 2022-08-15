console.log("hello");
const go = document.getElementById("coffee-button");

// declare all our inputs
const priceInput = document.getElementById("price-input")
const nameInput = document.getElementById("name-input")
const imageURLInput = document.getElementById("image-url-input");

// setting up our coffee data
// const latte = {
//   name: "Long Black",
//   price: 3.0,
//   image_url:
//     "https://whitehorsecoffee.com.au/wp-content/uploads/2016/09/unnamed-6.jpg",
// };

go.onclick = () => {
  console.log("clicked");
  $.ajax({
    url: `http://localhost:3100/addCoffee`,
    // use the post type to create data somewhere
    // requesting to POST our data
    type: "POST",
    // we can send objects through to the backend, using the data argument
    data: {
      // the first property (i.e. the one on the left) called name has to be spelt exactly as the schema
      name: nameInput.value,
      price: priceInput.value,
      image_url: imageURLInput.value
        },
    success: () => {
      console.log("A new coffee was added.");
    },
    error: () => {
      console.log("Error: cannot reach the backend");
    },
  });
};

let renderCoffees = (coffees) => {
  console.log("The render coffee function is running")

  coffees.forEach((item) => {
      result.innerHTML += `
      <div id="result-container">
      <img src="${item.image_url}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}<p> 
      </div>
      `
  })
  // console.log(coffees)
}

$.ajax({
  type: "GET",
  url: "http://localhost:3100/allCoffee",
  // your success function contains a object which can be named anything
  success: (coffees) => {
      console.log(coffees)
      renderCoffees(coffees);
  },
  error: (error) => {
      console.log(error);
  }
})
