import Service from "@components/service/Index.jsx"; // Similar a Customer

const ServiceStep = () => (
  <div className="col-12">
    <div className="card custom-card">
      <div className="card-body">
        <h3 className="card-title border-bottom mb-4 pb-2">Servicios</h3>
        <Service /> {/* Igual que CustomerStep usa Customer */}
      </div>
    </div>
  </div>
);

export default ServiceStep;
