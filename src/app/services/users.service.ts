import { UserDetails } from '../interfacesAndTypes';

interface Response {
  userName: string;
  password: string;
}

export class UsersServive {
  private users = [
    { userName: 'charan', password: '1234567' },
    { userName: 'chandu', password: '7654321' },
    { userName: 'mosh', password: 'mosh123' },
  ];

  isValidUser(obj: any): boolean {
    let dbUser = this.users.filter(
      (eachUser) => obj.userName === eachUser.userName
    );
    if (dbUser.length === 0) {
      return false;
    } else {
      if (dbUser[0].password === obj.password) {
        this.setLoggedUserDetails(obj);
        return true;
      } else {
        return false;
      }
    }
  }

  loggedUserDetails() {
    let key: string = 'user_details';
    let fromStroage = localStorage.getItem(key);
    let val: UserDetails;
    if (typeof fromStroage == 'string') {
      val = JSON.parse(fromStroage);
      return val;
    } else {
      return null;
    }
  }

  setLoggedUserDetails(obj: Response) {
    localStorage.setItem('user_details', JSON.stringify(obj));
  }

  isUserLoggedIn() {
    if (localStorage.getItem('user_details') === null) return false;
    return true;
  }
}
