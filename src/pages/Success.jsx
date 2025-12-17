import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";

export default function Success({ order }) {

  if (!order) {
    return <p>Sipariş bulunamadı.</p>;
  }

  return (
    <div className="success-page">

      <div className="success-header">
        <Link to="/">
          <img src={logo} alt="Teknolojik Yemekler" />
        </Link>
      </div>

      <div className="success-content">
        <h1 className="success-title">
          TEBRİKLER! <br />
          <span className="line-2">SİPARİŞİNİZ ALINDI!</span>
        </h1>

        {/* sipariş bilgileri */}
        <div className="information">
      
          <p><strong>İsim:</strong> {order.name}</p>
          <p><strong>Boyut:</strong> {order.size}</p>
          <p><strong>Hamur:</strong> {order.dough}</p>

          <p><strong>Malzemeler:</strong></p>
          <ul>
            {order.toppings.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p><strong>Toplam:</strong> {order.totalPrice} ₺</p>

        
        </div>

      </div>

    </div>
  );
}
