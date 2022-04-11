import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GithubService } from './github.service';
import { GithubServiceMock } from './github.service.mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: GithubService,
          useClass: GithubServiceMock,
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should show input component initially`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.inputVisible).toBeTrue();
  });

  it(`should have empty cache initially`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.repositoryCache).toEqual('');
    expect(app.repositoryDetails).toEqual([]);
  });

  it('should render navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav div a strong')?.textContent).toContain('GitHub sortable repository comparison');
  });
});
