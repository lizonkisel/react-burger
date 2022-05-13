import orderDetails from './order-details.module.css';

import done from '../../images/done.png';

export default function OrderDetails() {

  return (
    <article className={orderDetails.card}>
      <p className={`text text_type_digits-large ${orderDetails.orderId}`}>034536</p>
      <span className='mt-8 text text_type_main-medium'>идентификатор заказа</span>
      <img className={`mt-15 mb-15 ${orderDetails.image}`} src={done}/>
      <div className={`mb-30 ${orderDetails.info}`}>
        <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
      </div>

    </article>
  )
}
