import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAddress, getCartItems } from '../../actions';

import { MaterialButton } from '../../components/MaterialUI';
import Layout from '../../containers/TheLayout';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import CartPage from '../CartPage';
import AddressForm from './AddressForm';

import Grid from '@material-ui/core/Grid';
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import './style.css';

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
	return (
		<div className="checkoutStep">
			<div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
				<div>
					<span className="stepTitle">{props.title}</span>
					<span className="stepNumber" style={{ cursor: 'pointer' }}>
						{props.stepNumber}
					</span>
				</div>
			</div>
			{props.body && props.body}
		</div>
	);
};

const Address = ({ adr, selectAddress, enableAddressEditForm, confirmDeliveryAddress, onAddressSubmit }) => {
	return (
		<Grid container className="addressContainer">
			{/* <div>
				<input name="address" onClick={() => selectAddress(adr)} type="radio" />
			</div> */}
			<Grid item xs={12} sm={12} className="addressinfo">
				{!adr.edit ? (
					<div>
						<div className="addressDetail">
							<div className="liAddressDetail">
								<label htmlFor={"a-option" + adr.name + adr.cityDistrictTown + adr.mobileNumber + adr.address}>
									<span>{adr.mobileNumber}</span>
									<span className="addressName">{adr.name}</span>
								</label>
								<input type="radio" id={"a-option" + adr.name + adr.cityDistrictTown + adr.mobileNumber + adr.address} name="address" onClick={() => selectAddress(adr)} />
							</div>
							{adr.selected && (
								<button className="anchoraddressDetail" onClick={() => enableAddressEditForm(adr)}>
									<EditLocationOutlinedIcon />
								</button>
							)}
						</div>
						<div className="fullAddress">
							{adr.address} <br /> {`${adr.state} - ${adr.cityDistrictTown}`}
						</div>
						{adr.selected && (
							<MaterialButton
								title="تحویل اینجا"
								onClick={() => confirmDeliveryAddress(adr)}
								style={{ width: '150px', margin: '12px 0 2px' }}
							/>
						)}
					</div>
				) : (
					<AddressForm
						withoutLayout={true}
						onSubmitForm={onAddressSubmit}
						initialData={adr}
						onCancel={() => { }}
					/>
				)}
			</Grid>
		</Grid>
	);
};

const CheckoutPage = (props) => {
	const user = useSelector((state) => state.user);
	const auth = useSelector((state) => state.auth);
	const [newAddress, setNewAddress] = useState(false);
	const [address, setAddress] = useState([]);
	const [confirmAddress, setConfirmAddress] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [orderSummary, setOrderSummary] = useState(false);
	const [orderConfirmation, setOrderConfirmation] = useState(false);
	const [paymentOption, setPaymentOption] = useState(false);
	const [confirmOrder, setConfirmOrder] = useState(false);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const onAddressSubmit = (addr) => {
		setSelectedAddress(addr);
		setConfirmAddress(true);
		setOrderSummary(true);
	};

	const onAddressSubmit2 = (addr) => {
		setNewAddress(false);
		setConfirmAddress(false);
		setOrderSummary(false);
	};

	const selectAddress = (addr) => {
		//console.log(addr);
		const updatedAddress = address.map(
			(adr) => (adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false })
		);
		setAddress(updatedAddress);
	};

	const confirmDeliveryAddress = (addr) => {
		setSelectedAddress(addr);
		setConfirmAddress(true);
		setOrderSummary(true);
	};

	const enableAddressEditForm = (addr) => {
		const updatedAddress = address.map(
			(adr) => (adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false })
		);
		setAddress(updatedAddress);
	};

	const userOrderConfirmation = () => {
		setOrderConfirmation(true);
		setOrderSummary(false);
		setPaymentOption(true);
	};

	const onConfirmOrder = () => {
		const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
			const { price, qty } = cart.cartItems[key];
			return totalPrice + price * qty;
		}, 0);
		const items = Object.keys(cart.cartItems).map((key) => ({
			productId: key,
			payablePrice: cart.cartItems[key].price,
			purchasedQty: cart.cartItems[key].qty
		}));
		const payload = {
			addresspalce: selectedAddress.address,
			addressunit: selectedAddress.cityDistrictTown,
			addresscity: selectedAddress.state,
			addressphone: selectedAddress.mobileNumber,
			addressId: selectedAddress._id,
			totalAmount,
			items,
			paymentStatus: 'pending',
			paymentType: 'cod'
		};

		console.log(payload);
		dispatch(addOrder(payload));
		setConfirmOrder(true);
	};

	useEffect(
		() => {
			auth.authenticate && dispatch(getAddress());
			auth.authenticate && dispatch(getCartItems());
			if (!auth.authenticate) {
				setNewAddress(false);
				setAddress([]);
				setConfirmAddress(false);
				setSelectedAddress(null);
				setOrderSummary(false);
				setOrderConfirmation(false);
				setPaymentOption(false);
				setConfirmOrder(false);
			}
		},
		[auth.authenticate, dispatch]
	);

	useEffect(
		() => {
			const address = user.address.map((adr) => ({
				...adr,
				selected: false,
				edit: false
			}));
			setAddress(address);
			//user.address.length === 0 && setNewAddress(true);
		},
		[user.address]
	);

	useEffect(
		() => {
			if (confirmOrder && user.placedOrderId) {
				props.history.push(`/order_details/${user.placedOrderId}`);
			}
		},
		[confirmOrder, props.history, user.placedOrderId]
	);

	return (
		<Layout>
			<Grid container className="checkOutPageContainer">

				<Grid item xs={12} sm={4} md={3}>
					<PriceDetails
						totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
							return qty + cart.cartItems[key].qty;
						}, 0)}
						totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
							const { price, qty } = cart.cartItems[key];
							return totalPrice + price * qty;
						}, 0)}
					/>
				</Grid>


				<Grid item xs={12} sm={8} md={9}>
					<div className="checkoutContainer">

						{/* check if user logged in or not */}
						<CheckoutStep
							stepNumber={'1'}
							title={'حساب کاربری'}
							active={!auth.authenticate}
							body={
								auth.authenticate ? (
									<Grid container className="loggedInId">
										<Grid item xs={12} sm={6} md={8} className="loggedInGrid">
											<span>{auth.user.fullName}</span>
											<span className="loggedInTxt">نام</span>
										</Grid>
										<Grid item xs={12} sm={6} md={4} className="loggedInGrid">
											<span>{auth.user.email}</span>
											<span className="loggedInTxt">ایمیل</span>
										</Grid>
									</Grid>
								) : (
									<div className="NotloggedInId">
										<p>!کاربری یافت نشد، به حساب کاربری خود وارد شوید</p>
									</div>
								)
							}
						/>

						<CheckoutStep
							stepNumber={'2'}
							title={'نشانی تحویل'}
							active={!confirmAddress && auth.authenticate}
							body={
								<div>
									{confirmAddress && selectedAddress ? (
										<div className="stepCompleted">{`${selectedAddress.name} - ${selectedAddress.address} - ${selectedAddress.mobileNumber}`}</div>
									) : (
										address.map((adr, key) => (
											<Address
												selectAddress={selectAddress}
												enableAddressEditForm={enableAddressEditForm}
												confirmDeliveryAddress={confirmDeliveryAddress}
												onAddressSubmit={onAddressSubmit}
												adr={adr}
												key={key}
											/>
										))
									)}
								</div>
							}
						/>

						{/* AddressForm */}
						{confirmAddress ? null : newAddress ? (
							<AddressForm
								onSubmitForm={onAddressSubmit2}
								setnewaddress={setNewAddress}
								onCancel={() => { }}
							/>
						) : auth.authenticate ? (
							<CheckoutStep
								stepNumber={'+'}
								title={'افزودن آدرس جدید'}
								active={false}
								onClick={() => setNewAddress(true)}
							/>
						) : null}

						<CheckoutStep
							stepNumber={'3'}
							title={'خلاصه سفارش'}
							active={orderSummary}
							body={
								orderSummary ? (
									<CartPage onlyCartItems={true} />
								) : orderConfirmation ? (
									<div className="stepCompleted">
										تعداد موارد : {Object.keys(cart.cartItems).length} مورد
									</div>
								) : null
							}
						/>

						{orderSummary && (
							<Card style={{ margin: '10px 0' }}>
								<div className="flexRow sb orderSummary">
									<p>
										.ارسال خواهد شد <strong>{auth.user.email}</strong> ایمیل تأیید سفارش به
									</p>
									<MaterialButton
										title="ادامه دهید"
										onClick={userOrderConfirmation}
										style={{ width: '200px' }}
									/>
								</div>
							</Card>
						)}

						<CheckoutStep
							stepNumber={'4'}
							title={'گزینه های پرداخت'}
							active={paymentOption}
							body={
								paymentOption && (
									<div>
										<div className="flexRow paymentOption">
											<div>
												<label htmlFor="codOne">پرداخت نقدی هنگام تحویل</label>
												<input type="radio" name="paymentOption" id="codOne" value="cod" />
											</div>
											<div>
												<label htmlFor="codTwo">پرداخت از طریق درگاه بانکی</label>
												<input type="radio" name="paymentOption" id="codTwo" value="cod" />
											</div>
										</div>
										<div className="paymentOptionButton">
											<MaterialButton
												title="تأیید سفارش"
												onClick={onConfirmOrder}
												style={{ width: '200px', margin: '5px 20px 15px' }}
											/>
										</div>
									</div>
								)
							}
						/>
					</div>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default CheckoutPage;
