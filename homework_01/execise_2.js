{   
    //Execise1
   const str = "This house is nice !";
   const words = ["nice","house"];
    // using ES6 features
    String.prototype.filterWords = function (words){
        let allWords = this.split(" ");         
        return allWords.map(word=>words.includes(word) ? "***": word).join(" ");        
    };
    console.log("Using ES6 features: " + str.filterWords(words));

    // using Promise function
    let filterWords2 = (str,words) => {
        return new Promise((resolve, reject) => {                
          if ( str != null) {
            let result = str.split(" ").map(word=>words.includes(word) ? "***": word).join(" ");     
            resolve(result);
          } else {
            reject(Error("Something is wrong!"));
          }
        });
    };  
    filterWords2(str,words).then(res => {
        console.log("Promise Succeed: " +res);
      })
      .catch(res => {
        console.log("Promise Error: " + res);
      });

    
    // using Async & await
    async function filterWords3(str, words) {
        try {
            let result = await str.split(" ").map(word=>words.includes(word) ? "***": word).join(" ");     
            return console.log(result);
        } catch (error) {
            return console.log("Some error!");
        }
    }
    filterWords3("async and await: "+str,words);

    // using Observables with Promise
    const { from } = rxjs;
    from(filterWords2(str,words)).subscribe(e => console.log("Observable: " + e));

   // using Observable.Create only
   const { Observable } = rxjs;
   const obj$ = Observable.create(
       function(observer){
            observer.next(str.split(" ").map(word=>words.includes(word) ? "***": word).join(" "));  
            observer.complete();
       }
   );
   const subscription = obj$.subscribe(
       function (x) {console.log(`Observable result: ${x}`);},
       function (err) {console.log(`Observable error: ${err}`);},
       function() { console.log("Done.")}
   );
   console.log("I am the last, but syncronouse process...");

    //Execise2
   function isWeekend() {
      const todayDate = new Date();
      const day = todayDate.getDay();
      numbers = ["weekend","weekday","weekday","weekday","weekday","weekday","weekend"];
      console.log(numbers[day]);
     /* const {from} = rxjs;
      const {map, filter} = rxjs.operators;
      const data = [{"0":"weekend"},{"1":"weekday"},{"2":"weekday"},{"3":"weekday"},{"4":"weekday"},{"5":"weekday"},{"6":"weekend"}];
      from(data)
      .pipe(
        filter(obj => obj)
      ).subscribe(
        obj => console.log(obj[day])
      );*/
   }
   isWeekend();

  //Execise3
  const item = {
    "name" : "Avocado",
    "type" : "Fruit",
    "category" : "Food",
    "price" : 200
  }
/*  const applyCoupon = item => disc => {
    item.price = item.price - (item.price * disc / 100);
    return item;
  };
  console.log(applyCoupon(item)(10).price === 180);
*/
  const applyCoupon1 = function(item){
    return function(disc){
      item.price = item.price - (item.price * disc / 100);
      return item;
    }
  }   
  console.log(applyCoupon1(item)(10).price === 180);

}
