import { SweetAlertOptions } from 'sweetalert2';

export const swalErrorLocation = (
    title: string = 'Error de ubicación',
    text: string = 'No se pudo obtener la ubicación actual, verifique su conexión o permita a la aplicación conocer su ubicación',
    icon: string = '<i class="fas fa-map-marker-alt iconBorder"></i>',
    html: string = `
    <div>
        <div class="iconSwal">${icon}</div><hr>
        <h4 class='text-center'>${title}</h4>
        <p style='font-size: 18px;' class='mt-4'>${text}</p>
    </div>`
): SweetAlertOptions => ({
    html,
    showCancelButton: false,
    showConfirmButton: false
})
export const swalListPerimeter = (
    html: string,
    title: string = 'Lista de perimetros',
    text: string = 'Listado de perimetros registrados'
): SweetAlertOptions => ({
    title,
    text,
    html,
    showConfirmButton: true,
    customClass: {
        confirmButton: 'confirmButton'
    },
    confirmButtonText: 'Listo',
    showCloseButton: true
});
export const swalListTypeParameter = (
    title: string = 'Tipos de parametros'
): SweetAlertOptions => ({
    title,
    html: `<hr>
        <div class='row typeParameters'>
            <div class='col-12 col-sm-12 col-lg-6 mt-3 iconSelect'>
                <i class="far fa-circle"></i><br/>
                Circular
            </div>
            <div class='col-12 col-sm-12 col-lg-6 mt-3 iconSelect'>
                <i class="fas fa-draw-polygon"></i><br/>
                Poligono
            </div>
        </div>
    `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Seleccionar',
    customClass: {
        confirmButton: 'confirmButton'
    }
})