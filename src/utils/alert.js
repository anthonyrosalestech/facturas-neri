import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/**
 * @param {Object} options - Configuración para SweetAlert2
 * @returns {Promise}
 */
export const showAlert = (options) => {
  return MySwal.fire({
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "btn btn-primary me-2",
      cancelButton: "btn btn-secondary",
    },
    buttonsStyling: false,
    ...options,
  });
};
