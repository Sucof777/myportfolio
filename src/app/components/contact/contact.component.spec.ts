import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { ContactMessagesService } from '../../services/contact-messages.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactMessagesService: ContactMessagesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactMessagesService = TestBed.inject(ContactMessagesService);
    spyOn(contactMessagesService, 'addMessage').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form and show success', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });

    component.onSubmit();

    expect(component.status).toBe('success');
    expect(component.submitting).toBeFalse();
    expect(contactMessagesService.addMessage).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });
    expect(component.contactForm.value).toEqual({
      name: null,
      email: null,
      message: null,
    });
  });

  it('should surface an error when the form is invalid', () => {
    component.onSubmit();

    expect(component.status).toBe('error');
    expect(component.submitting).toBeFalse();
  });
});
