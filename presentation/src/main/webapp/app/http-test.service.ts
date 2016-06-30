import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

@Injectable()

export class HTTPTestService
{
    constructor(private _http:Http)
    {}

    getNotes(url:string) //  Get anfrage
    {
        // Hier get Anfrgae zur kommunikation mit der Restschnittstelle
        return this._http.get(url).map(res => res.json());
    }
    readNote(id:number)
    {
        var neu = id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post('/resources/Notes/readNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    postJSON()
    {
        var json = JSON.stringify({var1:'Test',var2:3});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');

        return this._http.post('http://validate.jsontest.com',
        params,{
                headers:headers
            }).map(res => res.json());
    }
    newNote(Id:number,content:string,owner:string) {
        var neu = [{"Id":Id,"Content":content,"Owner":owner}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

       return this._http
            .post('/resources/Notes/createNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    deleteAllNotes()
    {
        return this._http.get("/resources/Notes/deleteAll").map(res => res.text());
    }
    readAllNotes()
    {
        return this._http.get("/resources/Notes/readAll").map(res => res.text());
    }
    deleteNote(id:number)
    {
        var neu = id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Notes/deleteNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    updateNote(Id:number,content:string,owner:string)
    {
        var neu = [{"Id":Id,"Content":content,"Owner":owner}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Notes/updateNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    newUser(username:string,password:string)
    {
        var neu = [{"loginName":username,"password":password}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/access/register',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    updateUser(id:number,loginName:string,password:string)
    {
        var neu = [{"id":id,"loginName":loginName,"password":password}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Users/updateUser',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    deleteUser(id:number)
    {
        var neu = id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Users/updateUser',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    readUser(id:number)
    {
        var neu = id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Users/readUser',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
    login(username:string,password:string,remember:boolean)
    {
        var neu = username+','+password+','+remember;
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/access/login',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }
}