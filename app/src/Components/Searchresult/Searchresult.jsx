import React from 'react';
import { BASE_URL } from '../../App';

const SearchResult = ({ data }) => {
    return (
        <div className="foodCardContainer">
            <div className='Container'>
                <div className="FoodCards">
                    {
                        data?.map(({ name, price, text, image, type }) => {
                            return (
                                <div className="FoodCard" key={name}>
                                    <div className="food_image">
                                        <img src={BASE_URL + image} alt="" />
                                    </div>

                                    <div className="food_info">
                                        <div className="info">
                                            <h3>{name}</h3>
                                            <p>{text}</p>
                                        </div>
                                        <button>${price.toFixed(2)}</button>
                                    </div>


                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResult;