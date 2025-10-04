import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ContactService } from '../../services/contact.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    contactService = jasmine.createSpyObj<ContactService>('ContactService', [
      'sendMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form, call the service and show success', () => {
    contactService.sendMessage.and.returnValue(of(void 0));

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });

    component.onSubmit();

    expect(contactService.sendMessage).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });
    expect(component.status).toBe('success');
    expect(component.submitting).toBeFalse();
    expect(component.contactForm.value).toEqual({
      name: null,
      email: null,
      message: null,
    });
  });

  it('should surface an error when the service fails', () => {
    contactService.sendMessage.and.returnValue(
      throwError(() => new Error('Network error')),
    );

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });

    component.onSubmit();

    expect(contactService.sendMessage).toHaveBeenCalled();
    expect(component.status).toBe('error');
    expect(component.submitting).toBeFalse();
    // Form values remain because reset is not called on failure
    expect(component.contactForm.value).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there, this message is long enough.',
    });
  });
});
