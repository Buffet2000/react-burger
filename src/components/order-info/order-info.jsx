import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './order-info.module.css'
import OrderIngredient from '../orders/order-ingredient/order-ingredient';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderInfo({ modal, data, feedOrder }) {
	const navigate = useNavigate();
	const { id } = useParams();

	const currentOrderData = data.find(item => item._id === id);
	const allIngredients = useSelector((store) => store.ingredients.items);
	const orderingredients = currentOrderData?.ingredients.map((item) => allIngredients.find((data) => data._id === item));
	const totalPrice = orderingredients?.reduce((previous, current) => previous + current.price, 0);
	const uniqueIngredients = currentOrderData?.ingredients.filter((element, index) => {
		return currentOrderData.ingredients.indexOf(element) === index;
	}).reverse();

	function Counter(arr, id) {
		return arr.filter(item => item == id).length
	};

	useEffect(() => {
		if (data && !currentOrderData) {
			return (navigate('/'))
		}
	}, [])

	return (
		<>
			{currentOrderData === undefined
				? <p>Загрузка</p>
				: <div className={`${styles.orderContainer}`}>
					<h3 className={`${styles.orderName} text text_type_main-medium mb-3`}>{currentOrderData.name}</h3>
					{currentOrderData.status === 'created' && (<p className={` text text_type_main-default`}>Создан</p>)}
					{currentOrderData.status === 'pending' && (<p className={`text text_type_main-default`}>Готовится</p>)}
					{currentOrderData.status === 'done' && (<p className={`${styles.orderDone} text text_type_main-default mb-15`}>Выполнен</p>)}
					<p className={`${styles.orderConsist} text text_type_main-medium mb-6`}>Состав:</p>
					<ul className={`${styles.blockWithScroll} mb-10`}>
						{uniqueIngredients.map((item) => {
							const ingredientInfo = allIngredients.find(ingredient => ingredient._id === item);
							return (<li className={`${styles.ingredientCard}`} key={ingredientInfo._id}>
								<div className={`${styles.ingredient}`}>
									<OrderIngredient id={item} />
									<p className={`text text_type_main-default ml-4`}>{ingredientInfo.name}</p>
								</div>
								<div className={`${styles.ingredientPriceBlock}`}>
									<p className={`text text_type_digits-default mr-2`}>{Counter(currentOrderData.ingredients, item)} x {ingredientInfo.price}</p>
									<CurrencyIcon />
								</div>
							</li>)
						})}
					</ul>
					<div className={`${styles.bottomBlock}`}>
						<p className={`${styles.orderDate} text text_type_main-default `}><FormattedDate date={new Date(currentOrderData.createdAt)} /></p>
						<TotalPrice size={'text text_type_digits-default'} totalPrice={totalPrice} />
					</div>
				</div >
			}
		</>
	);
}

OrderInfo.propTypes = {
	modal: PropTypes.bool
}
/*
{modal
						? <p className={`text text_type_digits-default mb-10`}>#{currentOrderData.number}</p>
						: <p className={`${styles.modal} text text_type_digits-default`}>#{currentOrderData.number}</p>
					}
*/