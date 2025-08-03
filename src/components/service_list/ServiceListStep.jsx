import React, { useEffect, useState } from "react";
import { useServiceStore } from "@stores/servicesStore.jsx";
import { useCustomerStore } from "@stores/customerStore.jsx";
import ServiceList from "@components/service_list/Index.jsx";
import { calcularTotalCosto, fillTemplate } from "@utils/index.js";

// let html2pdf;
// if (typeof window !== "undefined") {
//   html2pdf = require("html2pdf.js");
// }

const ServiceListStep = () => {
  const [html2pdf, setHtml2pdf] = useState(null);
  const forms = useServiceStore((state) => state.forms);
  const customerForm = useCustomerStore((state) => state.customerForm);

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

  const generatePDF = () => {
    if (!html2pdf) return; // solo cliente

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

    const htmlFilled = fillTemplate(templateHtml, {
      name: getValueOrNA(customerForm?.customerName),
      dir: getValueOrNA(customerForm?.customerAddress),
      comment: getValueOrNA(customerForm?.customerDescription),
      mail: getValueOrNA(customerForm?.customerEmail),
      telephone: getValueOrNA(customerForm?.customerTelephone),
      table: tablaHtml,
      total,
    });

    const container = document.createElement("div");
    container.innerHTML = htmlFilled;
    document.body.appendChild(container);

    html2pdf()
      .set({
        filename: "factura.pdf",
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
        </div>
      </div>
    </div>
  );
};

export default ServiceListStep;
