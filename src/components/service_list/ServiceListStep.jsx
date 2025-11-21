import React, { useEffect, useState } from "react";
import { useServiceStore } from "@stores/servicesStore.jsx";
import { useCustomerStore } from "@stores/customerStore.jsx";
import { useProcessStore } from "@stores/processStore.jsx"; // 👈 Para obtener el proceso seleccionado
import ServiceList from "@components/service_list/Index.jsx";
import { calcularTotalCosto, fillTemplate } from "@utils/index.js";

const ServiceListStep = () => {
  const [html2pdf, setHtml2pdf] = useState(null);
  const forms = useServiceStore((state) => state.forms);
  const customerForm = useCustomerStore((state) => state.customerForm);

  // const selectedProcess = useProcessStore((state) => state.selectedProcessId); // 👈 ID
  // const processName = useProcessStore((state) => state.name); // 👈 Nombre (asegúrate que exista en tu store)

  const selectedProcessId = useProcessStore((state) => state.selectedProcessId);
  const processes = useProcessStore((state) => state.processes);

  const selectedProcess = processes.find((p) => p.id === selectedProcessId);
  const processName = selectedProcess ? selectedProcess.name : "";

  const [templateHtml, setTemplateHtml] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((module) => {
        setHtml2pdf(() => module.default || module);
      });
    }
  }, []);

  useEffect(() => {
    setTotal(calcularTotalCosto(forms));
  }, [forms]);

  useEffect(() => {
    fetch("/templates/template.html")
      .then((res) => res.text())
      .then((html) => setTemplateHtml(html));
  }, []);

  // ✅ Función para generar nombre dinámico
  const getFileName = () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const cleanName = (processName || "Proceso").replace(/\s+/g, "-");
    return `${cleanName}-${
      selectedProcessId || "ID"
    }_${formattedDate}_ticket.pdf`;
  };

  const getFilledTemplate = () => {
    if (!templateHtml) return "";

    const currencyFormatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    });

    const tablaHtml = forms
      .map(
        (form) => `
          <tr>
            <td>${form.productName}</td>
            <td>${form.productDescription || ""}</td>
            <td>${form.quantity}</td>
            <td>${currencyFormatter.format(form.price)}</td>
            <td>${currencyFormatter.format(
              form.subTotal || form.quantity * form.price
            )}</td>
          </tr>`
      )
      .join("");

    const getValueOrNA = (val) => (val && val.trim() !== "" ? val : "N/A");

    return fillTemplate(templateHtml, {
      name: getValueOrNA(customerForm?.customerName),
      dir: getValueOrNA(customerForm?.customerAddress),
      comment: getValueOrNA(customerForm?.customerDescription),
      mail: getValueOrNA(customerForm?.customerEmail),
      telephone: getValueOrNA(customerForm?.customerTelephone),
      table: tablaHtml,
      total: currencyFormatter.format(total),
    });
  };

  const generatePDF = () => {
    if (!html2pdf) return;

    const htmlFilled = getFilledTemplate();

    const container = document.createElement("div");
    container.innerHTML = htmlFilled;
    document.body.appendChild(container);

    html2pdf()
      .set({
        filename: getFileName(), // ✅ Usa el nombre dinámico
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4" },
      })
      .from(container)
      .save()
      .then(() => container.remove());
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
            <h3 className="card-title m-0">Vista previa</h3>
            <button className="btn btn-primary" onClick={generatePDF}>
              Descargar PDF
            </button>
          </div>

          <ServiceList />

          <div
            className="mt-4 border rounded p-3 bg-light preview-container d-none d-md-block"
            style={{
              overflowX: "auto",
              maxHeight: "500px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {templateHtml ? (
              <div dangerouslySetInnerHTML={{ __html: getFilledTemplate() }} />
            ) : (
              <p>Cargando vista previa...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListStep;
