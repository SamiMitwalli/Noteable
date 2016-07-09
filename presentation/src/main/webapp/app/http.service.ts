import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

@Injectable()

export class HTTPService {
    constructor(private _http:Http) {
    }

    // METHODEN FÜR NOTES

    createNote(content:string) // success = id of Note || error = null
    {
        var neu = {"content": content};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._http
            .post('resources/access/user/createNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    readNotes() // JSON of Notes mit id,content
    {
        return this._http.get("resources/access/user/readNotes").map(res => res.json());
    }

    updateNote(id:number, content:string) // success = id of Note || error = null
    {
        var neu = {"id": id, "content": content};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._http
            .post('resources/access/user/updateNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    deleteNote(id:number) // success = id of Note || error = null
    {
        var neu = {"id": id};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._http
            .post('resources/access/user/deleteNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    // METHODEN FÜR USER
    
    userinfo() {
        return this._http.get("resources/access/user/info").map(res => res.json());
    }

    register(loginName:string, password:string) // success = id of Note || error = null
    {
        var neu = {"loginName": loginName, "password": password};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._http
            .post('resources/access/register',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    login(loginName:string, password:string, remember:boolean) // success = true || error = false
    {
        var neu = {"loginName": loginName, "password": password, "remember": remember};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._http
            .post('resources/access/login',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    changePassword(id:number, password:string) // success = id of Note || error = null
    {
        var neu = {"id": id, "password": password};
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('resources/access/user/changePassword',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    logout() // success = 1 || error = null
    {
        return this._http.get("resources/access/user/logout").map(res => res.text());
    }

    deleteAccount(id:number) // success = id of Note || error = null
    {
        var neu = {"id": id};
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('resources/access/user/deleteAccount',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    // ADMIN AKTIONEN

    deleteNotes() // success = 1 || error = null
    {
        return this._http
            .get('resources/access/admin/deleteAllNotes')
            .map(response => response.text());
    }

    deleteUsers() {
        return this._http.get("resources/access/admin/deleteAllUsers").map(res => res.json());
    }
    allNotes() {
        return this._http.get("resources/access/admin/readAllNotes").map(res => res.json());
    }
    allUsers()
    {
        return this._http.get("resources/access/admin/readAllUsers").map(res => res.json());
    }

    // TEST METHODEN

    getNotes(url:string) //  Get anfrage
    {

        return this._http.get(url).map(res => res.json());

    }
}