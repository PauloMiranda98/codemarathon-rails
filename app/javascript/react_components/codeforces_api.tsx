export class CodeforcesApi {
  lastTimeout: Date;
  delay: number;

  constructor(delay: number = 2000) {
    this.delay = delay;
    this.lastTimeout = new Date();
  }

  nextTimeout(){
    let now = new Date();
    let diff = now.getTime() - this.lastTimeout.getTime();
    if(diff >= this.delay) {
      this.lastTimeout = now;
      return 0;
    }else{
      this.lastTimeout.setTime(this.lastTimeout.getTime() + this.delay);
      return this.delay - diff;
    }
  }

  requestNextPromise(request: any){
    let delay = this.nextTimeout();

    return new Promise(function (resolve: any, reject: any) {
      setTimeout(function () {
        request().then((data => resolve(data)))
      }, delay);
    });
  }

  getSubmissions(handle: String) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
            .then((response) => response.json())
    });
  }

  getStandings(handle: String, contestId: Number) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&showUnofficial=true&handles=${handle}`)
            .then((response) => response.json())
    });
  }

  getUserInfo(handle: String) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
            .then((response) => response.json())
            .then((data) => console.log(data));
    });
  }
}