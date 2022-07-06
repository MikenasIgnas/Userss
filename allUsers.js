const userInfo = document.getElementById("user-info");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((user) => {
    user.map((user) => {
      let userInfoContainer = document.createElement("div");
      userInfoContainer.classList.add("userInfoContainer");
      console.log(user.id);
      userInfoContainer.innerHTML = `<div class="ItemContent"><div class="itemHeader"><h2><a href="./oneUser.html?user_id=${user.id}">${user.name} (${user.username})</a></h2></div>
                           <div class="itemListElement"> <ul class="listItems">
                              <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
                              <li><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></li>
                              <li><strong>Address:</strong> <a href="#">${user.address.street} ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                              <li><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></li>
                              <li><strong>Work:</strong> ${user.company.name}</li>
                            </ul></div>
                            </div>`;
      userInfo.append(userInfoContainer);
    });
  });
