export class CodeforcesApi {
  lastTimeout: Date;
  delayInMs: number;

  constructor(delayInMs: number = 2000) {
    this.delayInMs = delayInMs;
    this.lastTimeout = new Date();
  }

  nextTimeout(){
    let now = new Date();
    let diff = now.getTime() - this.lastTimeout.getTime();
    
    if(diff >= this.delayInMs) {
      this.lastTimeout = now;
      return 0;
    }else{
      this.lastTimeout.setTime(this.lastTimeout.getTime() + this.delayInMs);
      return this.delayInMs - diff;
    }
  }

  requestNextPromise(request: () => Promise<any>) {
    let delay = this.nextTimeout();

    return new Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        request().then((data => resolve(data)));
      }, delay);
    });
  }

  getSubmissions(handle: String) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
            .then((response) => response.json());
    });
  }

  getStandings(handle: String, contestId: Number) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&showUnofficial=true&handles=${handle}`)
            .then((response) => response.json());
    });
  }

  getUserInfo(handle: String) {
    return this.requestNextPromise(() => {
      return fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
            .then((response) => response.json());
    });
  }
}