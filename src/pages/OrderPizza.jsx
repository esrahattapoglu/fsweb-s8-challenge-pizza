
import logo from '../assets/logo.svg'
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Order({ setOrder }){

  /* SABİT VERİLER */
  

  const toppings=[
    "Pepperoni",
    "Tavuk Izgara",
    "Mısır",
    "Sarımsak",
    "Ananas",
    "Sosis",
    "Soğan",
    "Sucuk",
    "Biber",
    "Kabak",
    "Kanada Jambonu",
    "Domates",
    "Jalepeno",
    
  ];

  const startToppings=[
    "Pepperoni",
    "Mısır",
    "Sosis",
    "Ananas",
    "Jalepeno",
  ];

  const pizzaPrice = 85.5;
  const extraPrice = 5;

  /*  STATELER*/

  const [count, setCount]= useState(1);   
  const [chosenToppings, setChosenToppings] = useState(startToppings)
  const [name, setName]=useState("")
  const [size, setSize] =useState("")
  const [dough, setDough] = useState("")
  const [errorMessage, setErrorMessage] = useState("");



  /*  HESAPLAMALAR VE VALIDASYONLAR */

  const isNameValid=name.trim().length >= 3

  const isToppingsValid=
  chosenToppings.length >=4 &&
  chosenToppings.length <= 10


  const isFormValid =
   isNameValid && isToppingsValid &&size !== "" && dough !== ""


  const toppingsTotal = chosenToppings.length * extraPrice;
  const totalPrice = (pizzaPrice * count) + toppingsTotal;

  /* HANDLER FONKSİYONLARI */

  function handleNameChange(event){
    setName(event.target.value);
  }

  function handleIncrease(){
    setCount(count+1)
  }

  function handleDecrease(){
    if (count > 1) {
      setCount(count-1)

    }
  }

  function handleToppingChange(topping){
  if (chosenToppings.includes(topping)){
    setChosenToppings(
      chosenToppings.filter(item => item !== topping)
    )

    }  else {
  if (chosenToppings.length >= 10) 
    return;
    setChosenToppings([...chosenToppings, topping]);
}
  }

  function handleSizeChange(event) {
  setSize(event.target.value);
  }

  function handleDoughChange(event) {
  setDough(event.target.value);
  }

  const history = useHistory();

  function handleSubmit(event) {
  event.preventDefault()



  if (!isFormValid) return

  const orderData = {
   name,
   size,
   dough,
   toppings: chosenToppings,
   count,
   totalPrice,
}

  axios
    .post(
      "https://reqres.in/api/pizza",
      orderData,
      {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      }
    )
    .then((response) => {
      setOrder({
         ...orderData,
         response: response.data,
  })
       history.push("/success")
  })
    .catch(() => {
      setErrorMessage("Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
  });

}



  /* JSX */
     


  return (
  <>
    {/* HEADER */}
   
    <header className="order-header">
  
       <img src={logo} alt="logo" />

        <p className="small-text">
          <Link to="/" className="home-link">Anasayfa</Link> -{" "}
        <strong>Sipariş Oluştur</strong></p>
   </header>

   
    <form onSubmit={handleSubmit}>
      <main className="page">

        {/* Pizza Bilgisi */}

        <section className="pizza-section">
          <h3 >Position Absolute Acı Pizza</h3>

          <div className="price-row">
            <span className="price">85.50₺</span>
            <span className="rating">
                <span >4.9</span>
                <span >(200)</span>
            </span>
          </div>

          <p className="pizza-desc">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        {/* RADİO-SELECT */}
        <div className="row">

          <section className="size-section">
            <h4>Boyut Seç <span className="redh4">*</span></h4>

            <label className="radio-item">
              <input
                type="radio"
                name="size"
                value="Küçük"
                checked={size === "Küçük"}
                onChange={handleSizeChange}
                data-cy="size-small"
              />
              Küçük
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="size"
                value="Orta"
                checked={size === "Orta"}
                onChange={handleSizeChange}
                data-cy="size-medium"
              />
              Orta
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="size"
                value="Büyük"
                checked={size === "Büyük"}
                onChange={handleSizeChange}
                data-cy="size-large"
              />
              Büyük
            </label>
          </section>

          <section className="dough-section">
            <h4>Hamur Seç <span className="redh4">*</span></h4>
            <select
              value={dough}
              onChange={handleDoughChange}
              data-cy="dough-select"
             
            >
              <option defaultValue>Hamur Kalınlığı</option>
              <option>İnce Hamur</option>
              <option>Kalın Hamur</option>
            </select>
          </section>

        </div>

        {/* CHECKBOX - EK MALZEMELER */}
        <section className="topping-section">
          <h4>Ek Malzemeler</h4>
          <p className="topping-info">
            En fazla 10 malzeme seçebilirsiniz. 5₺
          </p>

          <div className="topping-grid">
            {toppings.map(item => (
              <label key={item} className="topping-item">
                <input
                  type="checkbox"
                  checked={chosenToppings.includes(item)}
                  onChange={() => handleToppingChange(item)}
                  data-cy={"topping-" + item}
                />
                {item}
              </label>
            ))}
          </div>
          {!isToppingsValid && (
             <p className="error">En az 4, en fazla 10 malzeme seçmelisin</p>
           )}
        </section>

        {/* İNPUT */}

        {/* İSİM */}
        <section className="name-section">
          <h4>İsminiz <span className="redh4">*</span></h4>
          <input
            type="text"
            placeholder="Adınızı giriniz"
            value={name}
            onChange={handleNameChange}
            data-cy="name-input"
            
          />
          {!isNameValid && (
              <p className="error">İsim en az 3 karakter olmalı</p>
           )}
        </section>

        {/* NOT */}
        <section className="note-section">
          <h4>Sipariş Notu</h4>
          <textarea
            rows="3"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            
          />
        </section>

        {/* ADET VE TOPLAM */}
        <section className="order-section">
        
        <div className="order-actions">
            
          <div className="count">
            <button type="button" 
            onClick={handleDecrease}
            data-cy="count-decrease"
            >-</button>
            <span>{count}</span>
            <button type="button" 
            onClick={handleIncrease}
            data-cy="count-increase"
            >+</button>
          </div>
          </div>

          <div className="order-total">
            <h4>Sipariş Toplamı</h4>
            <p className="price-row">
            <span>Seçimler</span>
             <span>{toppingsTotal.toFixed(2)}₺</span></p>
            <p className="total-price price-row">
              <span>Toplam</span>
              <span>{totalPrice.toFixed(2)}₺</span>
            </p>

            <button 
            disabled={!isFormValid}
            data-cy="submit-order">
              SİPARİŞ VER
            </button>
            {errorMessage && (
              <p className="error">{errorMessage}</p>
              )}
          </div>

          

        </section>

      </main>
    </form>
  </>
);

}