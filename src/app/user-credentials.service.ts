import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  userName: string;
  UID: string;
  allUserAccountDetails = [];
  businessUserDetails: any;
  userDetails: any;  
  userUID: string;
  businessUserUID: string;
  userId : string;

  Country = [
    {
      name: "Afghanistan"
    },
    {
      name: "Albania"
    },
    {
      name: "Algeria"
    },
    {
      name: "Andorra"
    },
    {
      name: "Angola"
    },
    {
      name: "Antigua and Barbuda"
    },
    {
      name: "Argentina"
    },
    {
      name: "Armenia"
    },
    {
      name: "Australia"
    },
    {
      name: "Austria"
    },
    {
      name: "Austrian Empire"
    },
    {
      name: "Azerbaijan"
    },
    {
      name: "Baden"
    },
    {
      name: "Bahamas"
    },
    {
      name: "Bahrain"
    },
    {
      name: "Bangladesh"
    },
    {
      name: "Barbados"
    },
    {
      name: "Bavaria"
    },
    {
      name: "Belarus"
    },
    {
      name: "Belgium"
    },
    {
      name: "Belize"
    },
    {
      name: "Benin"
    },
    {
      name: "Bolivia"
    },
    {
      name: "Bosnia and Herzegovina"
    },
    {
      name: "Botswana"
    },
    {
      name: "Brazil"
    },
    {
      name: "Brunei Darussalam"
    },
    {
      name: "Bulgaria"
    },
    {
      name: "Burkina Faso"
    },
    {
      name: "Burundi"
    },
    {
      name: "Cabo Verde"
    },
    {
      name: "Cambodia"
    },
    {
      name: "Cameroon"
    },
    {
      name: "Canada"
    },
    {
      name: "Central African Republic"
    },
    {
      name: "Chad"
    },
    {
      name: "Chile"
    },
    {
      name: "China"
    },
    {
      name: "Colombia"
    },
    {
      name: "Comoros"
    },
    {
      name: "Congo"
    },
    {
      name: "Cook Islands"
    },
    {
      name: "Costa Rica"
    },
    {
      name: "Croatia"
    },
    {
      name: "Cuba"
    },
    {
      name: "Cyprus"
    },
    {
      name: "Czechia"
    },
    {
      name: "Côte d'Ivoire"
    },
    {
      name: "Democratic People's Republic of Korea"
    },
    {
      name: "Democratic Republic of the Congo"
    },
    {
      name: "Denmark"
    },
    {
      name: "Djibouti"
    },
    {
      name: "Dominica"
    },
    {
      name: "Dominican Republic"
    },
    {
      name: "Ecuador"
    },
    {
      name: "Egypt"
    },
    {
      name: "El Salvador"
    },
    {
      name: "Equatorial Guinea"
    },
    {
      name: "Eritrea"
    },
    {
      name: "Estonia"
    },
    {
      name: "Eswatini"
    },
    {
      name: "Ethiopia"
    },
    {
      name: "Faroe Islands"
    },
    {
      name: "Fiji"
    },
    {
      name: "Finland"
    },
    {
      name: "France"
    },
    {
      name: "Gabon"
    },
    {
      name: "Gambia"
    },
    {
      name: "Georgia"
    },
    {
      name: "Germany"
    },
    {
      name: "Ghana"
    },
    {
      name: "Greece"
    },
    {
      name: "Grenada"
    },
    {
      name: "Guatemala"
    },
    {
      name: "Guinea"
    },
    {
      name: "Guinea-Bissau"
    },
    {
      name: "Guyana"
    },
    {
      name: "Haiti"
    },
    {
      name: "Honduras"
    },
    {
      name: "Hungary"
    },
    {
      name: "Iceland"
    },
    {
      name: "India"
    },
    {
      name: "Indonesia"
    },
    {
      name: "Iran (Islamic Republic of)"
    },
    {
      name: "Iraq"
    },
    {
      name: "Ireland"
    },
    {
      name: "Israel"
    },
    {
      name: "Italy"
    },
    {
      name: "Jamaica"
    },
    {
      name: "Japan"
    },
    {
      name: "Jordan"
    },
    {
      name: "Kazakhstan"
    },
    {
      name: "Kenya"
    },
    {
      name: "Kiribati"
    },
    {
      name: "Kuwait"
    },
    {
      name: "Kyrgyzstan"
    },
    {
      name: "Lao People's Democratic Republic"
    },
    {
      name: "Latvia"
    },
    {
      name: "Lebanon"
    },
    {
      name: "Lesotho"
    },
    {
      name: "Liberia"
    },
    {
      name: "Libya"
    },
    {
      name: "Lithuania"
    },
    {
      name: "Luxembourg"
    },
    {
      name: "Madagascar"
    },
    {
      name: "Malawi"
    },
    {
      name: "Malaysia"
    },
    {
      name: "Maldives"
    },
    {
      name: "Mali"
    },
    {
      name: "Malta"
    },
    {
      name: "Marshall Islands"
    },
    {
      name: "Mauritania"
    },
    {
      name: "Mauritius"
    },
    {
      name: "Mexico"
    },
    {
      name: "Micronesia (Federated States of)"
    },
    {
      name: "Monaco"
    },
    {
      name: "Mongolia"
    },
    {
      name: "Montenegro"
    },
    {
      name: "Morocco"
    },
    {
      name: "Mozambique"
    },
    {
      name: "Myanmar"
    },
    {
      name: "Namibia"
    },
    {
      name: "Nauru"
    },
    {
      name: "Nepal"
    },
    {
      name: "Netherlands"
    },
    {
      name: "New Zealand"
    },
    {
      name: "Nicaragua"
    },
    {
      name: "Niger"
    },
    {
      name: "Nigeria"
    },
    {
      name: "Niue"
    },
    {
      name: "North Macedonia"
    },
    {
      name: "Norway"
    },
    {
      name: "Oman"
    },
    {
      name: "Pakistan"
    },
    {
      name: "Palau"
    },
    {
      name: "Panama"
    },
    {
      name: "Papua New Guinea"
    },
    {
      name: "Paraguay"
    },
    {
      name: "Peru"
    },
    {
      name: "Philippines"
    },
    {
      name: "Poland"
    },
    {
      name: "Portugal"
    },
    {
      name: "Qatar"
    },
    {
      name: "Republic of Korea"
    },
    {
      name: "Republic of Moldova"
    },
    {
      name: "Romania"
    },
    {
      name: "Russian Federation"
    },
    {
      name: "Rwanda"
    },
    {
      name: "Saint Kitts and Nevis"
    },
    {
      name: "Saint Lucia"
    },
    {
      name: "Saint Vincent and the Grenadines"
    },
    {
      name: "Samoa"
    },
    {
      name: "San Marino"
    },
    {
      name: "Sao Tome and Principe"
    },
    {
      name: "Saudi Arabia"
    },
    {
      name: "Senegal"
    },
    {
      name: "Serbia"
    },
    {
      name: "Seychelles"
    },
    {
      name: "Sierra Leone"
    },
    {
      name: "Singapore"
    },
    {
      name: "Slovakia"
    },
    {
      name: "Slovenia"
    },
    {
      name: "Solomon Islands"
    },
    {
      name: "Somalia"
    },
    {
      name: "South Africa"
    },
    {
      name: "South Sudan"
    },
    {
      name: "Spain"
    },
    {
      name: "Sri Lanka"
    },
    {
      name: "Sudan"
    },
    {
      name: "Suriname"
    },
    {
      name: "Sweden"
    },
    {
      name: "Switzerland"
    },
    {
      name: "Syrian Arab Republic"
    },
    {
      name: "Tajikistan"
    },
    {
      name: "Thailand"
    },
    {
      name: "Timor-Leste"
    },
    {
      name: "Togo"
    },
    {
      name: "Tokelau"
    },
    {
      name: "Tonga"
    },
    {
      name: "Trinidad and Tobago"
    },
    {
      name: "Tunisia"
    },
    {
      name: "Turkey"
    },
    {
      name: "Turkmenistan"
    },
    {
      name: "Tuvalu"
    },
    {
      name: "Uganda"
    },
    {
      name: "Ukraine"
    },
    {
      name: "United Arab Emirates"
    },
    {
      name: "United Kingdom of Great Britain and Northern Ireland"
    },
    {
      name: "United Republic of Tanzania"
    },
    {
      name: "United States of America"
    },
    {
      name: "Uruguay"
    },
    {
      name: "Uzbekistan"
    },
    {
      name: "Vanuatu"
    },
    {
      name: "Venezuela (Bolivarian Republic of)"
    },
    {
      name: "Viet Nam"
    },
    {
      name: "Yemen"
    },
    {
      name: "Zambia"
    },
    {
      name: "Zimbabwe"
    }
  ];
  constructor(private http: HttpClient, private toastController: ToastController,) {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.http.get('https://buyandsell-58d92.firebaseio.com/userAccounts.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.allUserAccountDetails.push({ ...responseData[key], id: key })
          }
        }
        return this.allUserAccountDetails;
      })
    ).subscribe(getData => {
      // console.log(getData);
    });

  }

  getLogginUserDetails() {
    if (this.allUserAccountDetails.length > 0) {
      this.userDetails = this.allUserAccountDetails.filter(value => this.UID == value.uid);
      this.businessUserDetails = this.allUserAccountDetails.filter(value => this.UID == value.uid && value.accountType == "business");
      console.log(this.userDetails);
      console.log(this.businessUserDetails);
      if (this.userDetails) {
        this.userDetails.forEach(element => {
          this.userId = element.id;
          this.userUID = element.uid;
          this.userName = element.name;
        });
      }
      if (this.businessUserDetails) {
        this.businessUserDetails.forEach(element => {
          this.userId = element.id;
          this.businessUserUID = element.uid;
          this.userName = element.name;
        });
      }
    }
  }

  async waitMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few seconds :) .',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
}
