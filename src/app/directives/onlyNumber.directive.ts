import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    standalone:true,
    selector: '[numberOnly]'
})
export class NumberOnlyDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: Event) {
        const inputElement = this.el.nativeElement as HTMLInputElement;
        const initialValue = inputElement.value;

        // Remove any non-numeric characters and spaces
        const newValue = initialValue.replace(/[^0-9]/g, '');

        // Update the input value with the filtered value
        if (newValue !== initialValue) {
            inputElement.value = newValue;
            // Dispatch an input event to notify Angular that the value has changed
            inputElement.dispatchEvent(new Event('input'));
        }
    }
}
