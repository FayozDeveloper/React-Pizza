import React, {useEffect} from 'react'
import {Categories, LoadingBlock, PizzaBlock, SortPopup} from "../components/ImportMain";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/action/filtersAction";
import {fetchPizzas} from "../redux/action/pizzasAction";



const CategoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const SortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
]

function Home () {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);


    useEffect(()=>{
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy])

    const onSelectCategory = React.useCallback((index)=>{
        dispatch(setCategory(index))
    },[])

    const onSelectSortType = React.useCallback((type)=>{
        dispatch(setSortBy(type))
    },[])

    const HandleAddPizzaToCart = (obj) =>{
        dispatch({
            type: 'ADD_PIZZA_CART',
            payload: obj,
        });
    }

    return(
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={CategoryNames}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    items={SortItems}
                    onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map((obj)=> (
                        <PizzaBlock
                            key={obj.id}
                            onClickAddPizza={HandleAddPizzaToCart}
                            isLoaded={true}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length }
                            {...obj}
                        />
                    )) : Array(12).fill(0).map((_,index)=> <LoadingBlock key={index}/>)}
            </div>
        </div>
    )
}
export default Home;