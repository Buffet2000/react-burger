import { useEffect } from 'react';
import styles from './feed.module.css'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/constants/web-socket';
import { useDispatch, useSelector } from "../../services/types/hooks";
import Orders from '../../components/orders/orders';
import FeedInfo from '../../components/feed-info/feed-info';

export default function Feed({ path }: {path: string}) {
	const dispatch = useDispatch();
	const wsData = useSelector((store) => store.wsOrders);
	const ordersData = useSelector((store) => store.wsOrders.orders);

	useEffect(() => {
		dispatch({ type: WS_CONNECTION_START });
		return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
	}, [dispatch]);

	return (
		<div className={`${styles.page}`}>
			<h2 className={`${styles.block} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
			<div className={`${styles.block}`}>
				<Orders ordersData={wsData.orders!} path={path} />
				<div className={`${styles.ordersTemplate}`}>
					<div className={`${styles.ordersStatus}`}>
						{ordersData
							? <>
								<FeedInfo done name={"Готовы"} arr={ordersData} statusString={"done"} />
								<FeedInfo name={"В работе"} arr={ordersData} statusString={"pending"} />
							</>
							: null}
					</div>
					<h3 className={`${styles.statsHeader} text text_type_main-medium mt-15`}>Выполнено за все время:</h3>
					<p className={`${styles.statsData} text text_type_digits-large`}>{wsData.total}</p>
					<h3 className={`${styles.statsHeader} text text_type_main-medium mt-15`}>Выполнено за сегодня:</h3>
					<p className={`${styles.statsData} text text_type_digits-large`}>{wsData.totalToday}</p>
				</div>
			</div>
		</div>
	);
}