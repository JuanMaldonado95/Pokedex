import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }), // Inicia desde arriba
        animate('700ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })), // Mueve hacia abajo
    ])
]);




