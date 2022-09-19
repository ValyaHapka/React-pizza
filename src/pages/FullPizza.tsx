import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

interface Pizza {
  imageUrl: string;
  title: string;
  price: number;
}

export default function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoaded(false);
    async function query() {
      try {
        const { data } = await axios.get(
          `https://631646935b85ba9b11f404ca.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
        setIsLoaded(true);
      } catch (error) {
        alert('Ошибка!');
        setIsLoaded(false);
        navigate('/');
      }
    }
    query();
  }, [id]);

  return (
    <div className="container">
      {isLoaded && (
        <>
          <img src={(pizza as Pizza).imageUrl} alt="pizza" />
          <h2>{(pizza as Pizza).title}</h2>
          <h4>{(pizza as Pizza).price}</h4>
        </>
      )}
    </div>
  );
}
