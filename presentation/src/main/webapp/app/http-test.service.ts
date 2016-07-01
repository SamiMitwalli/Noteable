import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

@Injectable()

export class HTTPTestService
{
    constructor(private _http:Http)
    {}

    // METHODEN FÜR NOTES

    newNote(content:string)
    {
        var neu = [{"Content":content}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/Notes/createNote',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
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
            .map(response => response.json());
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

    readAllNotes()
    {
        return this._http.get("/resources/Notes/readAll").map(res => res.json());
    }

    deleteAllNotes()
    {
        return this._http.get("/resources/Notes/deleteAll").map(res => res.text());
    }

    // METHODEN FÜR USERS

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

    readUser(id:number)
    {
        var neu = id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post('/resources/Users/readUser',
                neu, {
                    headers: headers
                })
            .map(response => response.json());
    }
    
    updateUser(id:number,loginName:string,password:string)
    {
        var neu = [{"id":id,"loginName":loginName,"password":password}];
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/access/updateUser',
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
            .post('/resources/Users/deleteUser',
                neu, {
                    headers: headers
                })
            .map(response => response.text());
    }

    // METHODEN FÜR DIE AUTHENTIFIKATION
    
    login(username:string,password:string,remember:boolean)
    {
        var neu = username+','+password+','+remember;
        var headers = new Headers();
        headers.append('Content-Type', 'application/text');

        return this._http
            .post('/resources/access/login',
                neu, {
                    
                })
            .map(response => response.text());
    }


    // METHODEN ZUM TESTEN

    getNotes(url:string) //  Get anfrage
    {
        
        return this._http.get(url).map(res => res.json());
        
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

}