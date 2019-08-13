// Syntax
const observable = Rx.Observable.create(observer => {
    observer.next('this is ...')
    observer.next('...your data stream!\n\n')
})
observable.subscribe(val => print1('1. ' + val))
    // mouseEvents
const clicks = Rx.Observable.fromEvent(document, 'click')
clicks.subscribe(click => console.log(click))
clicks.subscribe(click => print2('X: ' + JSON.stringify(click.clientX) + ' | ' + 'Y: ' + JSON.stringify(click.clientY)))

const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("2. ...promise resolved\n\n");
    }, 0);
});
const observaPromesa = Rx.Observable.fromPromise(promesa);
observaPromesa.subscribe(result => print1(result));

const timer = Rx.Observable.timer(0)
timer.subscribe(done => print1('3. timer ding!\n\n'))

// const interval = Rx.Observable.interval(1000)
// interval.subscribe(int => print1(new Date().getSeconds())) 

const mashup = Rx.Observable.of('string', ['array'], 12) //, true, { property: 'value' })
mashup.subscribe(val => print1('4. ' + val + '\n\n'))

/////////////////////////////////
// left colum
function print1(val) {
    let el = document.createElement('p')
    el.innerText = val;
    document.getElementById("analytics").appendChild(el)
}

// right column
function print2(val) {
    let el = document.createElement('p')
    el.innerText = val;
    document.getElementById("analytics2").appendChild(el)
}