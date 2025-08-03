import Customer from "@components/customer/Index.jsx";

const CustomerStep = () => (
  <div className="col-12">
    <div className="card custom-card">
      <div className="card-body">
        <h3 className="card-title border-bottom mb-4 pb-2">
          Información del cliente
        </h3>
        <Customer />
      </div>
    </div>
  </div>
);

export default CustomerStep;
