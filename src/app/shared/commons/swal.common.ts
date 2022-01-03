import { SweetAlertOptions } from 'sweetalert2';

export const swalErrorLocation = (
    title: string = 'Error de ubicación',
    text: string = 'No se pudo obtener la ubicación actual, verifique su conexión o permita a la aplicación conocer su ubicación',
    icon: string = '<i class="fas fa-map-marker-alt iconBorder"></i>',
    html: string = `
    <div class="d-flex justify-content-center align-items-center mb-3">
        <div class="mr-4 iconSwal">${icon}</div><hr>
        <h3 class='mt-4 text-right'>${title}</h3>
        <div class='mt-4'>
            <p>${text}</p>
        </div>
    </div>`
): SweetAlertOptions => ({
    html,
    showCancelButton: false,
    showConfirmButton: false
})