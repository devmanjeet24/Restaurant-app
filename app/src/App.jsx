import React, { useEffect, useState } from 'react';
import "./assets/App.css"
import SearchResult from './Components/SearchResult/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState(null);
  const [filteredData, SetFilterData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedBtn, SetselectedBtn] = useState();


  useEffect(() => {
    const fetchFoodData = async () => {

      setLoading(true);

      try {

        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        SetFilterData(json);

        setLoading(false);

      } catch (err) {
        console.log(err);
        seterror("unable to fetch Data");
      }

    }

    fetchFoodData();

  }, [])

  console.log(data);

  if (error) return <div>{err}</div>
  if (Loading) return <div>Loading.........</div>

  const SearchFood = (e) => {
    const searchValu = e.target.value;
    console.log(searchValu);
    const filter = data?.filter((food) => {
      return (
        food.name.toLowerCase().includes(searchValu.toLowerCase())
      )
    });

    SetFilterData(filter);

  }

  const filterfood = (type) => {

    if (type == "all") {
      SetFilterData(data);
      SetselectedBtn('all');
      return;
    }

    const filterbtn = data?.filter((food) => {
      return (
        food.type.toLowerCase().includes(type.toLowerCase())
      )
    });


    SetFilterData(filterbtn);
    SetselectedBtn(type)

  }


  const filterbutton = [
    {
      name: "All",
      type: 'all'
    },
    {
      name: "Breakfast",
      type: 'breakfast'
    },
    {
      name: "Lunch",
      type: 'lunch'
    },
    {
      name: "All",
      type: 'all'
    },
    {
      name: "Dinner",
      type: 'dinner'
    }
  ]




  return (
    <>

      <div className='Container'>
        <div className="TopContainer">
          <div className="logo">
            <img src="/logo.svg" alt="" />
          </div>

          <div className='search'>
            <input onChange={SearchFood} placeholder='search Food' />
          </div>
        </div>

        <div className='FilterContainer'>

          {
            filterbutton.map((btn) => {
              return (
           
                <button key={btn.name} onClick={() => filterfood(btn.type)}>{btn.name}</button>
              )
            })
          }


          {/* <button onClick={() => filterfood('all')}>ALL</button>
          <button onClick={() => filterfood('breakfast')}>Breakfast</button>
          <button onClick={() => filterfood('lunch')}>Lunch</button>
          <button onClick={() => filterfood('dinner')}>Dinner</button> */}
        </div>

      </div>

      <SearchResult data={filteredData} />

    </>
  )
}

export default App