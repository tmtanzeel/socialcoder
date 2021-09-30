import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private username: string = "tmtanzeel";
  private clientid = 'Iv1.acb84c4d836f164b';
  private clientsecret = '4cb30cb5599060e01244a8f55168ec9758d6e3c4';


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllRepos().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  getAllRepos() {
    return this.http.get<any>('https://api.github.com/users/tmtanzeel');
  }

}
