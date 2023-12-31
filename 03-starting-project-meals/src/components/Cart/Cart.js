import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cardItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-http-5fac6-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cardItemAddHandler.bind(null, item)} />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
        </div>
    );

    const modalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </>;

    const submittingContent = <p>Submitting order...</p>;

    const submittedContent = <>
        <p>Successfully submitted order</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </>;


    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && modalContent}
            {isSubmitting && !didSubmit && submittingContent}
            {!isSubmitting && didSubmit && submittedContent}
        </Modal>
    )


};

export default Cart;