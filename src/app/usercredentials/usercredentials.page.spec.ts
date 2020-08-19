import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsercredentialsPage } from './usercredentials.page';

describe('UsercredentialsPage', () => {
  let component: UsercredentialsPage;
  let fixture: ComponentFixture<UsercredentialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercredentialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsercredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
