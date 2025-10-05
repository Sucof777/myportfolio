import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';
import { ContactMessagesService } from '../../services/contact-messages.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let contactMessagesService: ContactMessagesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    contactMessagesService = TestBed.inject(ContactMessagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render messages when available', () => {
    contactMessagesService.addMessage({
      name: 'Admin User',
      email: 'admin@example.com',
      message: 'Stored message for admin review.',
    });

    fixture.detectChanges();

    const nameEl = fixture.debugElement.query(
      By.css('[data-testid="message-name"]'),
    ).nativeElement as HTMLElement;
    const emailEl = fixture.debugElement.query(
      By.css('[data-testid="message-email"]'),
    ).nativeElement as HTMLElement;
    const bodyEl = fixture.debugElement.query(
      By.css('[data-testid="message-body"]'),
    ).nativeElement as HTMLElement;

    expect(nameEl.textContent).toContain('Admin User');
    expect(emailEl.textContent).toContain('admin@example.com');
    expect(bodyEl.textContent).toContain('Stored message for admin review.');
  });
});
