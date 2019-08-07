document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app);
    const db = firebase.firestore();
    const newUser = db.collection('users').doc('1');
    // static
    newUser.get()
        .then(doc => {
            const data = doc.data();
            console.log(data)
            document.getElementById("db-change").innerHTML = (`<strong>Name: </strong>${data.name}<br><strong>Email: </strong>${data.email}<br><strong>Membership: </strong>${data.groupName}<br><strong>Active Member: </strong>${data.isActive}`);
        });
    // real-time
    newUser.onSnapshot(doc => {
        const data = doc.data();
        document.getElementById("db-update").innerHTML = (`<strong>Name: </strong>${data.name}<br><strong>Email: </strong>${data.email}<br><strong>Membership: </strong>${data.groupName}`)
    })

    const allUsers = db.collection('users');
    const query = allUsers.where('isActive', '==', true)
    query.get()
        .then(users => {
            users.forEach(doc => {
                data = doc.data()
                document.getElementById("db-userlist").innerHTML += (`<p><strong>Name: </strong>${data.name}<br><strong>Email: </strong>${data.email}<br><strong>Membership: </strong>${data.groupName}<br><strong>Active Member: </strong>${data.isActive}<hr></p>`);

            })
        })
    const queryInactive = allUsers.where('isActive', '==', false)
    queryInactive.get()
        .then(users => {
            users.forEach(doc => {
                data = doc.data()
                document.getElementById("db-userlist-inactive").innerHTML += (`<p><strong>Name: </strong>${data.name}<br><strong>Email: </strong>${data.email}<br><strong>Membership: </strong>${data.groupName}<br><strong>Active Member: </strong>${data.isActive}<hr></p>`);

            })
        })
});

function updateStatus(e) { // need type-checking
    const db = firebase.firestore();
    const newData = db.collection('users').doc('1');
    // e.target.value = (e === "yes" || "true") ? true : false;
    newData.update({ isActive: e.target.value })
}

function updateData(e) {
    const db = firebase.firestore();
    const newData = db.collection('users').doc('1');
    newData.update({ name: e.target.value })
}


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.getElementById("new-user").innerHTML = (`Welcome to your Analyst Console, Bitcoinist <strong>${user.displayName}</strong>`);
            console.log(user)
        })
        .catch(console.log)
}