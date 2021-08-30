import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';
import './subHeader.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DehazeIcon from '@material-ui/icons/Dehaze';

const MenuHeader = (props) => {
	const category = useSelector(state => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategory());
	}, [dispatch]);

	const renderCategories = (categories) => {
		let myCategories = [];
		categories.map((category) =>
			myCategories.push(
				<li key={category.name}>
					{
						category.parentId
							?
							<a
								href={`/product/${category.slug}?type=${category.type}`}>
								{category.name}
							</a>
							:
							<span>{category.name}</span>
					}
					{category.children.length > 0 ? (
						<ul>{renderCategories(category.children)}</ul>
					) : null}
				</li>
			)
		)
		return myCategories;
	}

	useEffect(() => {
		const menu = document.querySelector(".menu");
		const menuMain = menu.querySelector(".menu-main");
		const goBack = menu.querySelector(".go-back");
		const menuTrigger = document.querySelector(".mobile-menu-trigger");
		const closeMenu = menu.querySelector(".mobile-menu-close");
		let subMenu;
		menuMain.addEventListener("click", (e) => {
			if (!menu.classList.contains("active")) {
				return;
			}
			if (e.target.closest(".menu-item-has-children")) {
				const hasChildren = e.target.closest(".menu-item-has-children");
				showSubMenu(hasChildren);
			}
		});
		goBack.addEventListener("click", () => {
			hideSubMenu();
		})
		menuTrigger.addEventListener("click", () => {
			toggleMenu();
		})
		closeMenu.addEventListener("click", () => {
			toggleMenu();
		})
		document.querySelector(".menu-overlay").addEventListener("click", () => {
			toggleMenu();
		})
		function toggleMenu() {
			menu.classList.toggle("active");
			document.querySelector(".menu-overlay").classList.toggle("active");
		}
		function showSubMenu(hasChildren) {
			subMenu = hasChildren.querySelector(".sub-menu");
			subMenu.classList.add("active");
			subMenu.style.animation = "slideLeft 0.5s ease forwards";
			const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
			menu.querySelector(".current-menu-title").innerHTML = menuTitle;
			menu.querySelector(".mobile-menu-head").classList.add("active");
		}

		function hideSubMenu() {
			subMenu.style.animation = "slideRight 0.5s ease forwards";
			setTimeout(() => {
				subMenu.classList.remove("active");
			}, 300);
			menu.querySelector(".current-menu-title").innerHTML = "";
			menu.querySelector(".mobile-menu-head").classList.remove("active");
		}

		window.onresize = function () {
			if (this.innerWidth > 767) {
				if (menu.classList.contains("active")) {
					toggleMenu();
				}
			}
		}
	}, [])

	return (
		<div className="header">
			<div className="containerSubheader">
				<div className="row">


					<div className="header-item item-left">
						<div className="logo">
							<a href="/">ارغوانی</a>
						</div>
					</div>


					<div className="header-item item-center">
						<div className="menu-overlay">
						</div>
						<nav className="menu">
							<div className="mobile-menu-head">
								<div className="mobile-menu-close">&times;</div>
								<div className="current-menu-title"></div>
								<div className="go-back"><i><ChevronRightIcon /></i></div>
							</div>
							<ul className="menu-main">
								<li>
									<a href="/">صفحه اصلی</a>
								</li>
								<li>
									<a href="/">تماس با ما</a>
								</li>
								<li>
									<a href="/">قوانین و مقررات</a>
								</li>
								<li>
									<a href="/account/orders">پیگیری سفارش مرسوله</a>
								</li>
								{
									category.categories.map((category) =>
										<li key={category.name} className="menu-item-has-children">
											<span>{category.name} <i><ChevronLeftIcon /></i></span>
											<div className="sub-menu mega-menu mega-menu-column-4">
												{
													category.children.length > 0 ? (
														category.children.map((category) =>
															<div className="list-item" key={category.name}>
																<a className="title"
																	href={`/product/${category.slug}?cid=${category._id}&type=${category.type}`}>
																	{category.name}
																</a>
																<ul>
																	{renderCategories(category.children)}
																</ul>
															</div>
														)
													) : null
												}
											</div>
										</li>
									)
								}

							</ul>
						</nav>
						<div className="mobile-menu-trigger">
							<DehazeIcon />
						</div>
					</div>

				</div>
			</div>
		</div>
	)

}

export default MenuHeader