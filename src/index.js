document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(parsedData => supplyPups(parsedData));

  const getSingleDog = id => {
    fetch(`http://localhost:3000/pups/${id}`)
      .then(resp => resp.json())
      .then(parsedData => renderSingleDog(parsedData, id));
  };

  const updateDogStatus = boolean => {
    id = dogStatusBtn.dataset.id;

    // console.log(boolean);
    return fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: boolean
      })
    }).then(resp => resp.json());
  };

  //grab what I need
  dogBar = document.getElementById("dog-bar");
  dogInfo = document.getElementById("dog-info");
  dogFilterStatus = document.getElementById("good-dog-filter");

  //create dog card
  let dogName = document.createElement("H2");
  dogInfo.append(dogName);
  let dogImg = document.createElement("IMG");
  dogInfo.append(dogImg);
  let dogStatusBtn = document.createElement("button");
  dogInfo.append(dogStatusBtn);

  //dom manipulation
  const supplyPups = data => {
    dogBar.innerHTML = "";
    data.forEach(dog => {
      //I need to be able to access this data in two places.
      //1: populate dogBar
      //create containers
      dogButton = document.createElement("span");
      dogButton.innerText = dog.name;
      dogButton.dataset.id = dog.id;
      dogButton.addEventListener("click", handleDogButtonClick);
      //append containers
      dogBar.append(dogButton);
    });
  };
  const renderSingleDog = (singleDog, id) => {
    //2: display single dog
    dogName.innerText = singleDog.name;
    dogImg.src = singleDog.image;
    if (singleDog.isGoodDog === true) {
      dogStatusBtn.innerText = "GOOD DOG!";
      dogStatusBtn.dataset.id = id;
    } else {
      dogStatusBtn.innerText = "BAD DOG!";
      dogStatusBtn.dataset.id = id;
    }
  };

  //handle events
  const handleDogButtonClick = event => {
    // console.log(event.target.dataset.id);
    getSingleDog(event.target.dataset.id);
  };

  const toggleDogStatus = event => {
    if (dogStatusBtn.innerText === "GOOD DOG!") {
      dogStatusBtn.innerText = "BAD DOG!";
      updateDogStatus(false);
      //change the backend to reflect the change in isGoodDogz
    } else {
      dogStatusBtn.innerText = "GOOD DOG!";
      updateDogStatus(true);
      //change the backend to reflect the change in isGoodDogz
    }
  };

  const toggleFilter = event => {
    //change the text of the filter
    //indicate to another funciton that the filter is on?
    //additionally, limit the array of dogs sent to our constructor
    if (event.target.innerText === "Filter good dogs: OFF")
      event.target.innerText = "Filter good dogs: ON";
    else {
      event.target.innerText = "Filter good dogs: OFF";
    }
    console.log(event.target);
  };

  //add event listeners
  dogStatusBtn.addEventListener("click", toggleDogStatus);
  dogFilterStatus.addEventListener("click", toggleFilter);
});
