document.addEventListener("DOMContenetLoaded", event => {
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    const newUser = db.collection('users').doc('1');

    // newUser.get()
    //     .then(doc => {
    //         const data = doc.data();
    //         console.log(`User Name: ${data.name}<br>Active Member: ${data.isActive}<br>Email: ${data.email}<br>`)
    //             // document.getElementById("new-users").innerHTML = `User Name: ${data.name}<br>Active Member: ${data.isActive}<br>Email: ${data.email}<br>`
    //     });
    newUser.onSnapshot(doc => {
        const data = doc.data();
        document.getElementById("db-change").innerHTML = (`User Name: ${data.name}<br>Active Member: ${data.isActive}<br>Email: ${data.email}<br>`)
    })
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.getElementById("new-user").innerHTML = (`Welcome to your Analyst Console,<br /> Bitcoinist ${user.displayName}`);
            console.log(user)
        })
        .catch(console.log)
}